export default function validateEmail(email) {
  // Kiểm tra email rỗng hoặc không phải string
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Regex pattern để validate email
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Regex chi tiết hơn (tuân thủ RFC 5322)
  const detailedEmailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return detailedEmailRegex.test(email.trim());
}
