// src/components/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userId = localStorage.getItem("userId");
      axios
        .get(`http://localhost:3000/user/${userId}`)
        .then((response) => {
          setUserInfo(response.data.userDetails);
        })
        .catch((error) => {
          console.error("Failed to fetch user info", error);
        });
    }
  }, []);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleLogout = () => {
    // remove JWT token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white sticky top-0">
      <Link to="/homepage" className="flex items-center">
        <FaHome size={30} />
        <span className="text-xl font-bold">Home</span>
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link to="/homepage" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/aboutpage" className="hover:text-gray-400">
            About
          </Link>
        </li>
      </ul>

      <div className="relative">
        <FaUserCircle
          size={30}
          onClick={handleProfileClick}
          className="cursor-pointer"
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 p-1 w-60 bg-white text-black rounded-md shadow-lg py-2">
            {isLoggedIn ? (
              <>
                <p className="py-1 px-3 text-gray-500 text-sm">
                  <span className="text-black font-bold">Username: </span>
                  {userInfo.username}
                </p>
                <p className="py-1 px-3 text-gray-500 text-sm">
                  <span className="text-black font-bold">Email: </span>
                  {userInfo.email}
                </p>
                <p className="py-1 px-3 text-gray-500 text-sm">
                  <span className="text-black font-bold">Account-type: </span>
                  {userInfo.role}
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={handleLogout}
                    className="bg-gray-300 border border-gray-400 px-4 py-2 hover:bg-gray-400"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <p className="px-4 py-2">Please log in</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
