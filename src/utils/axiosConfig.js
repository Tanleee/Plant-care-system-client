import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://plant-care-system-server.onrender.com";

// Cấu hình axios mặc định
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

export { API_BASE_URL };
export default axios;
