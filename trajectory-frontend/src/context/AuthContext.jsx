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

  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
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

        if (!res.ok) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);

      } catch (err) {
        console.error("Error fetching user", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  // Login
  const login = (newToken, newUser = null) => {
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

    localStorage.removeItem("token");

    setToken(null);

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);