import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      toast.success("Account created successfully!");
      navigate('/');
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Create Account</h2>
      <input
        placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        placeholder="Email"
        type="email"
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
