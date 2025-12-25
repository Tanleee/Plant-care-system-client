// src/loaders/chartsDataLoader.js

export default async function chartsDataLoader() {
  // Chúng ta đã chuyển sang trang Báo Thức và dùng dữ liệu nội bộ (Local State)
  // Nên không cần gọi API tải dữ liệu lịch sử cảm biến nữa.
  
  // Trả về null để Router hoàn thành việc load trang ngay lập tức
  return null;
}