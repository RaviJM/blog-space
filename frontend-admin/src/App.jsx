// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
