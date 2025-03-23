import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Import the context hook

const Dropdown = () => {
  const navigate = useNavigate();
  const { userType, setUserType } = useUser(); // Get userType and setUserType from context
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className={`dropdown-container ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button onClick={toggleDropdown}>Profile</button>
      {isOpen && (
        <>
          <div className="dropDown">
            <button onClick={() => { 
              navigate("/login"); 
              setIsOpen(false); 
            }}>
              Sign In
            </button>
            <button onClick={() => { 
              navigate("/profile"); 
              setIsOpen(false); 
            }}>
              View Profile
            </button>
            <button onClick={() => { 
              setIsOpen(false);
              setUserType("Guest");
            }}>
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;