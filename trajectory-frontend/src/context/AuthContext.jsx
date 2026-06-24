import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { getCurrentUser } from "../../services/authServices"; 
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

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {

        const res = await getCurrentUser();
        console.log(res);
        if (res.status==500) {

          localStorage.removeItem(
            "token"
          );

          setToken(null);
          setUser(null);

          return;
        }

        setUser(res.data.user);

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