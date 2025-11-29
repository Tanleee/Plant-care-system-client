import React from "react";
import { getUserPhotoUrl, handleImageError } from "../../utils/imageHelper";

export default function UserAvatar({ photo, name, className = "", size = 40 }) {
  return (
    <img
      src={getUserPhotoUrl(photo)}
      alt={name || "User"}
      className={className}
      style={{ width: size, height: size, objectFit: "cover" }}
      onError={handleImageError}
    />
  );
}
