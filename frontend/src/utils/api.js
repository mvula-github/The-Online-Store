import axios from "axios";

const api = axios.create({
  baseURL: "https://your-backend-domain.com/api", // <-- Change to your backend URL
});

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
