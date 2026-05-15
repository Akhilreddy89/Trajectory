import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getMyProfile } from "../../services/profileService.js";
import { getLogin } from "../../services/authServices.js";
function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getLogin(form);
      const data = res.data;
      if (data.success) {

        login(data.token);

        const profile = await getMyProfile();

        if (
          !profile ||
          !profile.fullName ||
          profile.skills.length === 0
        ) {
          navigate("/profile");
        } else {
          navigate("/dashboard");
        }

      } 
    else {
      alert("Login failed");
    }
  } catch (err) {
    alert("Server error");
  }
};

return (
  <form onSubmit={handleSubmit}>
    <h2>Login</h2>

    <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
    />

    <input
      name="password"
      type="password"
      placeholder="Password"
      onChange={handleChange}
    />

    <button type="submit">Login</button>
  </form>
);
}

export default Login;