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
    <div style={styles.container}>
      <h1>BLOG SPACE</h1>
      <button style={styles.button} onClick={handleLoginClick}>
        Login
      </button>
      <button style={styles.button} onClick={handleSignupClick}>
        Signup
      </button>
      <button style={styles.button} onClick={handleGuestClick}>
        Continue as Guest
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RegistrationPage;
