import axios from "axios";
import api from "./api";
export const getLogin = async (form) => {
  try {
    const res = await api.post("/login", form);
      form,
      {
        withCredentials: true,
      }
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
    }
    return res;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400) {
        throw new Error(data.message || "Invalid email or password format.");
      } else if (status === 401) {
        throw new Error(data.message || "Invalid email or password.");
      } else if (status === 500) {
        throw new Error(data.message || "Server error. Please try again later.");
      } else {
        throw new Error(data.message || "Login failed. Please try again.");
      }
    } else if (error.request) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getRegister = async (form) => {
  try {
    const res = await api.post("/register", form);
    return res;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 400) {
        throw new Error(data.message || "Invalid input. Please check your details.");
      } else if (status === 409) {
        throw new Error(data.message || "Email already registered. Try logging in.");
      } else if (status === 500) {
        throw new Error(data.message || "Server error. Please try again later.");
      } else {
        throw new Error(data.message || "Registration failed. Please try again.");
      }
    } else if (error.request) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const getCurrentUser=async()=>{
  try{
    const res=await api.get("/me");
    return res;
  }
  catch(error){
    console.log("error",error);
  }
}


