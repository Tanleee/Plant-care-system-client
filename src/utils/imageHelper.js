/**
 * Kiểm tra xem photo có phải là URL đầy đủ không
 * @param {string} photo - Tên file hoặc URL
 * @returns {boolean}
 */
export const isFullUrl = (photo) => {
  if (!photo) return false;
  return photo.startsWith("http://") || photo.startsWith("https://");
};

/**
 * Lấy đường dẫn ảnh người dùng
 * @param {string} photo - Tên file hoặc URL từ Google
 * @returns {string} - Đường dẫn ảnh đầy đủ
 */
export const getUserPhotoUrl = (photo) => {
  if (!photo || photo === "default.jpg") {
    return "/img/users/default.jpg";
  }

  if (isFullUrl(photo)) {
    return photo;
  }

  return `/img/users/${photo}`;
};

/**
 * Xử lý error khi load ảnh thất bại
 * @param {Event} e - Event object
 */
export const handleImageError = (e) => {
  e.target.src = "/img/users/default.jpg";
  e.target.onerror = null; // Prevent infinite loop
};

/**
 * Kiểm tra user có đăng ký bằng Google không
 * @param {Object} user - User object
 * @returns {boolean}
 */
export const isGoogleUser = (user) => {
  return user?.isGoogleAuth === true || isFullUrl(user?.photo);
};
