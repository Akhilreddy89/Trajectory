import axios from "axios";

export const getMyProfile = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/profile/me",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data.profile;
};

export const updateProfile = async (profile) => {
  const res=await axios.put(
    "http://localhost:5000/api/profile",profile,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data.profile;
};
export const getProfile=async()=>{
     const res = await axios.get(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data.profile;
}
export const getCompletedCourses=async()=>{
  const res = await axios.get(
    "http://localhost:5000/api/profile/completed-courses",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};
