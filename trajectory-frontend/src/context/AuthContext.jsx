import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Error fetching user", err);
      logout();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  // Login
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);