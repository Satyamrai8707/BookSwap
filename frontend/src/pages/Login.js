import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success("Logged in successfully!");
      navigate('/');
    } catch (err) {
      toast.error("Invalid credentials. Try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
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

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
