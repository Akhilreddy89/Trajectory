import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegister } from "../../services/authServices.js";
import "../style/Auth.css";
import Navbar from "../components/Navbar.jsx";
function Register() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [errors, setErrors] = useState({ fullname: "", email: "", password: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = { fullname: "", email: "", password: "" };
    const fullNameValue = form.fullname.trim();
    const emailValue = form.email.trim();
    const passwordValue = form.password.trim();

    if (!fullNameValue) {
      nextErrors.fullname = "Full name is required.";
    }

    if (!emailValue) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!passwordValue) {
      nextErrors.password = "Password is required.";
    } else if (passwordValue.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return !nextErrors.fullname && !nextErrors.email && !nextErrors.password;
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
      const res = await getRegister(form);
      const data = res.data;

      if (data.success) {
        navigate("/login");
      } else {
        setStatusMessage("Signup failed. Please review your details and try again.");
      }
    } catch (err) {
      setStatusMessage(err.message || "Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <div>
          <h2>Create an Account</h2>
          <p>Register now to unlock your personalized roadmap and course recommendations.</p>
        </div>

        {statusMessage && <div className="status-message">{statusMessage}</div>}

        <div className="field-group">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p className="field-error">{errors.fullname}</p>}

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
          <p>Already have an account? <span className="auth-text" onClick={() => navigate("/login")}>Log in</span></p>
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
    </>
  );
}

export default Register;