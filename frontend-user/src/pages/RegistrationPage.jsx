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

  const handleGuestClick = () => {
    navigate("/homepage");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-16">
        BLOG SPACE - Your Stories, Your Space
      </h1>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 min-w-24"
        onClick={handleLoginClick}
      >
        Login
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 min-w-24"
        onClick={handleSignupClick}
      >
        Signup
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={handleGuestClick}
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default RegistrationPage;
