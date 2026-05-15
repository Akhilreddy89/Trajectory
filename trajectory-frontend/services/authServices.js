 import axios from "axios";
 export const getLogin = async (form) => {

    const res = await axios.post(
        "http://localhost:5000/api/login",
        form,
        {
          withCredentials: true,
        }
      );
    return res;
    };
export const getRegister = async (form) => {
    const res = await axios.post(
        "http://localhost:5000/api/register",
        form,
        {
          withCredentials: true,
        }
      );
    return res;
};