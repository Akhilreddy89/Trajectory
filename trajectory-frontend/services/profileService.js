import api from "./api";
export const getMyProfile = async () => {
  try {
    const res = await api.get("/profile/me");
    return res.data.profile;
  } catch (error) {
    console.error("Error fetching my profile:", error);
    throw error;
  }
};

export const updateProfile = async (profile) => {
  try {
    const res = await api.put("/profile", profile);
    return res.data.profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get("/profile");
    return res.data.profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
