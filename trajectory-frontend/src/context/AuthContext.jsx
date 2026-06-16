// src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {

    const fetchUser = async () => {

      // No token found
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {

        const res = await fetch(
          "http://localhost:5000/api/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Invalid token
        if (!res.ok) {

          localStorage.removeItem(
            "token"
          );

          setToken(null);
          setUser(null);

          return;
        }

        const data = await res.json();

        // Adjust according to your API response
        // Example:
        // { user: {...} }

        setUser(data.user);

      } catch (err) {

        console.error(
          "Error fetching user:",
          err
        );

        localStorage.removeItem(
          "token"
        );

        setToken(null);
        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    fetchUser();

  }, [token]);

  // Login

  const login = (
    newToken,
    newUser = null
  ) => {

    localStorage.setItem(
      "token",
      newToken
    );

    setToken(newToken);

    if (newUser) {
      setUser(newUser);
    }
  };

  // Logout

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};