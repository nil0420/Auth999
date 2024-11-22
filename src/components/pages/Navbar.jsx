import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiX } from "react-icons/fi"; 
import { FaUserCircle } from "react-icons/fa"; 
import LogoutAlert from "../necessary/LogoutAlert";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    const user = users.find((user) => user.email === loggedInUserEmail);

    if (user) {
      setUsername(user.username);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutAlert(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("loggedInUserEmail");
    setUsername("");
    setUserEmail("");
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutAlert(false); 
  };

  const toggleProfileDetails = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  const closeProfilePopup = () => {
    setShowProfileDetails(false); 
  };

  return (
    <>
      {showLogoutAlert && (
        <LogoutAlert  message="Are you sure you want to logout?" onConfirm={handleConfirmLogout} onCancel={handleCancelLogout}/>
      )}
      <nav className="bg-black text-white h-[70px] shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-full px-6">
          <h1 className="text-4xl font-semibold tracking-wide cursor-pointer text-white hover:text-red-600 transition duration-300" onClick={() => navigate("/home")} >
            Foo<span className="text-red-600">Flixxx</span>
          </h1>

          <div className="flex items-center space-x-6 md:space-x-6" style={{ position: "relative", top: "10px" }} >
            {username ? (
              <div className="flex items-center space-x-3 bg-gray-800 rounded-full py-2 px-4 shadow-sm hidden md:flex" style={{ position: "relative",}}>
                <div className="bg-red-600 text-white font-semibold w-10 h-10 flex items-center justify-center rounded-full text-xl"  >
                  {username.charAt(0).toUpperCase()}
                </div>
                <p className="text-lg font-medium text-gray-200">
                  Welcome, <span className="font-semibold">{username}</span>
                </p>
              </div>
            ) : (
              <p className="text-lg font-medium text-gray-400 hidden md:block">
                Welcome, Guest
              </p>
            )}

            {username && (
              <div className="relative">
                <FaUserCircle    size={30}   className="cursor-pointer hover:text-red-600"   onClick={toggleProfileDetails} />
                {showProfileDetails && (
                  <div className="absolute right-0 mt-2 bg-white text-black p-4 rounded-lg shadow-lg w-48">
                    {/* Cross Button (Discard) */}
                    <FiX size={20} className="absolute top-2 right-2 cursor-pointer" onClick={closeProfilePopup} />
                    <p className="font-semibold text-lg">{username}</p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                    <button onClick={handleLogoutClick} className="mt-3 w-full text-sm bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-lg transition duration-300" >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

       
            {username && (
              <button onClick={handleLogoutClick} className="flex items-center bg-red-600 text-white hover:bg-red-700 text-sm py-2 px-6 rounded-lg transition duration-300 hidden md:flex" >
                <FiLogOut size={18} className="mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

     
      <style jsx>{`
        @media (max-width: 768px) {
          .flex.items-center.space-x-3 {
            bottom: 9px; /* Moves div up by 9px */
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
