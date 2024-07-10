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
    <nav>
      <Link to="/homepage">
        <FaHome size={30} />
      </Link>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/aboutpage">About</Link>
        </li>
      </ul>

      <div className="profile">
        <FaUserCircle size={30} onClick={handleProfileClick} />

        {showDropdown && (
          <div className="dropdown">
            {isLoggedIn ? (
              <>
                <p>Username: {userInfo.username}</p>
                <p>Email: {userInfo.email}</p>
                <p>Account-type: {userInfo.role}</p>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <p>Please log in</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
