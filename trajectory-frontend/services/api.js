
// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
// --- Frontend: src/api/axios.js (or wherever your axios instance lives) ---
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. "https://your-backend.onrender.com/api"
  withCredentials: true, // sends/receives httpOnly cookies automatically
});

export default api;

// --- What to remove from your existing auth code ---
// 1. Delete: localStorage.setItem("token", ...) after login/register
// 2. Delete: Authorization: `Bearer ${token}` header attached in axios interceptors
// 3. On logout, call POST /auth/logout instead of localStorage.removeItem("token")
// 4. On app load, instead of checking localStorage for a token, just call
//    GET /auth/me (getCurrentUser) — if it 401s, user isn't logged in.
//    The browser sends the cookie automatically; you don't manage it manually.