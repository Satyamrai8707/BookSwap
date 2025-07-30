import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBooks from "./pages/MyBooks";
import Requests from "./pages/Requests";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
