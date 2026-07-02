import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileService";

const ProfileContext = createContext();
const ONBOARDING_PATH = "/create-profile";

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchProfile = useCallback(async () => {
    setLoading(true);

    try {
      const profileData = await getProfile();
      setProfile(profileData ?? null);

      if (!profileData && location.pathname !== ONBOARDING_PATH) {
        navigate(ONBOARDING_PATH, { replace: true });
      }
    } catch (err) {
      const status = err.response?.status;

      if (status === 404) {
        setProfile(null);
        if (location.pathname !== ONBOARDING_PATH) {
          navigate(ONBOARDING_PATH, { replace: true });
        }
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within ProfileProvider");
  }

  return context;
};