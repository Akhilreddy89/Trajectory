import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyProfile } from "../../services/profileService.js";
import { getLogin } from "../../services/authServices.js";
import "../style/Auth.css";
import Navbar from "../components/Navbar.jsx";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    const emailValue = form.email.trim();
    const passwordValue = form.password.trim();

    if (!emailValue) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!passwordValue) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await getLogin(form);
      const data = res.data;
      
      if (data.success) {
        login(data.token, data.user);
        try{
          const profile = await getMyProfile();
          if (!profile || !profile.fullName || profile.skills.length === 0) {
            navigate("/profile");
          } else {
            navigate("/dashboard");
          }
        } 
        catch(error){
          console.error("Profile fetch failed after login:", profileErr);
          navigate("/profile");
        }
      }
      else {
        setStatusMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setStatusMessage(err.message || "Server error. Please try again later.");
      console.log(err);
    }
  };

return (
  <>
  <Navbar/>
  <div className="auth-page">
    <form className="auth-card" onSubmit={handleSubmit} noValidate>
      <div>
        <h2>Welcome Back</h2>
        <p>Log in to continue your learning journey with tailored recommendations.</p>
      </div>

      {statusMessage && <div className="status-message">{statusMessage}</div>}

      <div className="field-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="field-error">{errors.password}</p>}
      </div>
      <div className="auth-footer">
        <p>Don't have an account? <span className="auth-text" onClick={() => navigate("/register")}>Sign up</span></p>
      </div>
      <button type="submit">Login</button>
    </form>
    
  </div>
  </>
);
}

export default Login;