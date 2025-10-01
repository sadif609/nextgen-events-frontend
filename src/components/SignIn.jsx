import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signin', formData);
      const userData = res.data.user;
      login(userData);
      alert(res.data.message || "Login successful!");
      localStorage.setItem('user', JSON.stringify(userData));
      setFormData({ email: "", password: "" });
      navigate("/add-event");
    } catch (err) {
      console.error("Error logging in:", err);
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Sign In</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        
        <div className="auth-footer">
          <p>New here? <Link to='/signup'>Sign Up</Link> now.</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;