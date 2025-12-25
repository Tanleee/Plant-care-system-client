import React, { useState, useRef, useEffect } from "react";
import { useRouteLoaderData } from "react-router";
import axios from "axios";

import NavBar from "./../components/shared/NavBar";
import Footer from "./../components/shared/Footer";
import ShowAlert from "../components/shared/ShowAlert";
import useAlert from "../hooks/useAlert";

import AccountSidebar from "../components/account/AccountSidebar";
import ProfileTab from "../components/account/ProfileTab";
import PasswordTab from "../components/account/PasswordTab";
import BookingsTab from "../components/account/BookingsTab";
import BillingTab from "../components/account/BillingTab";
import NotificationsTab from "../components/account/NotificationsTab";
import DeleteAccountModal from "./../components/account/DeleteAccountModal";

import { getUserPhotoUrl, isGoogleUser } from "../utils/imageHelper";
import getApiUrl from "../utils/getApiUrl";

import "./../assets/userAccountStyle.css";

export default function UserAccountPage() {
  // const navigate = useNavigate();
  const userData = useRouteLoaderData("root");
  const { alert, showSuccess, showError, showWarning, hideAlert } = useAlert();

  const fileInputRef = useRef(null);

  const isGoogleAuthUser = isGoogleUser(userData);

  // Tabs
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    photo: userData?.photo || "default.jpg",
    role: userData?.role || "user",
    isGoogleAuth: userData?.isGoogleAuth || false,
  });

  const [originalProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    photo: userData?.photo || "default.jpg",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // ✅ Fix: Sử dụng useEffect để update validation
  useEffect(() => {
    if (passwordData.newPassword) {
      const checks = {
        minLength: passwordData.newPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(passwordData.newPassword),
        hasLowerCase: /[a-z]/.test(passwordData.newPassword),
        hasNumber: /[0-9]/.test(passwordData.newPassword),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword),
      };
      setPasswordValidation(checks);
    } else {
      setPasswordValidation({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
    }
  }, [passwordData.newPassword]);

  // ==== HELPER FUNCTIONS ====
  const hasProfileChanges = () =>
    profileData.name !== originalProfileData.name ||
    profileData.email !== originalProfileData.email ||
    selectedPhoto !== null;

  // ✅ Fix: Đơn giản hóa isPasswordValid
  const isPasswordValid = () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return false;
    }

    return Object.values(passwordValidation).every(Boolean);
  };

  // ==== HANDLE PHOTO ====
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      showError("Chỉ cho phép ảnh định dạng JPEG, PNG, GIF, WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError("Ảnh phải có kích thước nhỏ hơn 5MB");
      return;
    }

    setSelectedPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // ==== SUBMIT HANDLERS ====
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!hasProfileChanges()) {
      showWarning("Không có thay đổi nào để lưu");
      return;
    }

    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      if (selectedPhoto) formData.append("photo", selectedPhoto);

      const { data } = await axios.patch(
        getApiUrl("/api/v1/users/updateMe"),
        formData,
        { withCredentials: true }
      );
      if (data.status === "success") {
        showSuccess("Hồ sơ cập nhật thành công!", 36);
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (err) {
      showError(err.response?.data?.message || "Cập nhật hồ sơ thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (isGoogleAuthUser) {
      showError("Tài khoản Google không thể thay đổi mật khẩu tại đây");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("Mật khẩu không khớp");
      return;
    }

    if (!Object.values(passwordValidation).every(Boolean)) {
      showError("Mật khẩu không đáp ứng yêu cầu bảo mật");
      return;
    }

    setIsUpdating(true);
    try {
      const { data } = await axios.patch(
        getApiUrl("/api/v1/users/updateMyPassword"),
        {
          passwordCurrent: passwordData.currentPassword,
          password: passwordData.newPassword,
          passwordConfirm: passwordData.confirmPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (data.status === "success") {
        showSuccess("Mật khẩu đã được thay đổi thành công!", 2000);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (err) {
      showError(err.response?.data?.message || "Thay đổi mật khẩu thất bại");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(getApiUrl("/api/v1/users/deleteMe"), {
        withCredentials: true,
      });

      if (!res.status === 204) {
        throw new Error("Lỗi khi thực hiện xóa tài khoản");
      }

      showSuccess("Xóa tài khoản thành công", 2000);
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (err) {
      showError(err.message, 2000);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // ✅ Fix: Handler không gọi updatePasswordValidation nữa
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="user-account-page">
      {alert && <ShowAlert {...alert} onClose={hideAlert} />}

      <NavBar
        pageTitle="User Settings"
        user={{
          name: profileData.name,
          avatar: photoPreview || getUserPhotoUrl(profileData.photo),
        }}
      />

      <div className="account-container">
        <div className="account-wrapper">
          <AccountSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profileData={profileData}
            photoPreview={photoPreview}
            fileInputRef={fileInputRef}
            onPhotoClick={() => fileInputRef.current?.click()}
            onDeleteClick={() => setShowDeleteModal(true)}
            isGoogleAuth={isGoogleAuthUser}
          />

          <main className="account-content">
            {activeTab === "profile" && (
              <ProfileTab
                profileData={profileData}
                onProfileChange={(e) => {
                  const { name, value } = e.target;
                  setProfileData((prev) => ({ ...prev, [name]: value }));
                }}
                hasChanges={hasProfileChanges()}
                isUpdating={isUpdating}
                onSubmit={handleProfileSubmit}
                isGoogleAuth={isGoogleAuthUser}
              />
            )}

            {activeTab === "password" && (
              <PasswordTab
                passwordData={passwordData}
                showPasswords={showPasswords}
                passwordValidation={passwordValidation}
                onPasswordChange={handlePasswordChange}
                togglePasswordVisibility={(field) =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    [field]: !prev[field],
                  }))
                }
                isPasswordValid={isPasswordValid()}
                isUpdating={isUpdating}
                onSubmit={handlePasswordSubmit}
                isGoogleAuth={isGoogleAuthUser}
              />
            )}

            {activeTab === "bookings" && <BookingsTab />}
            {activeTab === "billing" && <BillingTab />}
            {activeTab === "notifications" && <NotificationsTab />}
          </main>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        style={{ display: "none" }}
        onChange={handlePhotoSelect}
      />

      <DeleteAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteAccount}
      />

      <Footer />
    </div>
  );
}
