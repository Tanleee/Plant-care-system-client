import { useState } from "react";

const FacebookLogin = ({ isSignUp = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFacebookLogin = () => {
    setIsLoading(true);

    window.FB.login(
      async (response) => {
        console.log("FB Login response:", response);

        if (response.status === "connected") {
          const accessToken = response.authResponse.accessToken;

          try {
            const res = await fetch(
              "https://plant-care-system-server.onrender.com/api/v1/users/facebook-auth",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  accessToken: accessToken,
                  isSignUp: isSignUp,
                }),
              }
            );

            const data = await res.json();

            if (data.status === "success") {
              console.log("Login success:", data);
              // Lưu token nếu cần
              localStorage.setItem("token", data.token);
              // Redirect
              window.location.href = "/dashboard";
            } else {
              alert(data.message || "Login failed");
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
          } finally {
            setIsLoading(false);
          }
        } else {
          console.log("User cancelled login or did not fully authorize.");
          setIsLoading(false);
        }
      },
      {
        scope: "email,public_profile",
      }
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      disabled={isLoading}
      className="social-button"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      {isLoading ? "Loading..." : "Facebook"}
    </button>
  );
};

export default FacebookLogin;
