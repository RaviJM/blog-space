// src/pages/RegistrationPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">BLOG SPACE - Creater Zone</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600"
        onClick={handleLoginClick}
      >
        Author Login
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handleSignupClick}
      >
        Author Signup
      </button>
    </div>
  );
};

export default RegistrationPage;
