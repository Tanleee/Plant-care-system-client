const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function getApiUrl(path) {
  if (import.meta.env.DEV) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
}

export default getApiUrl;
