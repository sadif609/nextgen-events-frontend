import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert("User registered successfully!");
      setFormData({ name: "", email: "", password: "" });
      navigate('/login');
    } catch (err) {
      console.error("Error registering user:", err);
      alert(err.response?.data?.message || "Failed to register user.");
    }
  };

  return (
    <div className="auth-page-wrapper"  >
      <div className="auth-container" >
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Sign Up</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" >
              <input
               style={{ backgroundColor: "rgba(225, 225, 249, 0.99)" }}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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
              Register
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;