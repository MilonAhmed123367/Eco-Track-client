// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaLeaf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to logout!");
    }
  };

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-2xl font-semibold bg-gradient-to-r from-[#FF6C0C] to-[#BF1A1A] p-2 rounded transition-transform transform hover:scale-105"
      : "text-2xl font-semibold hover:text-yellow-300 transition-colors";

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg animate__animated animate__fadeInDown">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold flex items-center gap-2 animate__animated animate__pulse animate__infinite"
        >
          <FaLeaf /> EcoTrack
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/challenges" className={navLinkClasses}>
            Challenges
          </NavLink>
          <NavLink to="/my-activities" className={navLinkClasses}>
            My Activities
          </NavLink>

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center space-x-2 hover:scale-105 transform transition"
              >
                <img
                  src={currentUser.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="text-2xl font-semibold">{currentUser.displayName || currentUser.email}</span>
              </button>

              {mobileOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg animate__animated animate__fadeInDown">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-activities"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    My Activities
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 bg-white text-green-600 rounded hover:scale-105 transform transition">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-white rounded hover:scale-105 transform transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-3xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-500 text-white animate__animated animate__fadeInDown">
          <Link to="/" className="block px-4 py-3 hover:bg-green-600 transition-colors">Home</Link>
          <Link to="/challenges" className="block px-4 py-3 hover:bg-green-600 transition-colors">Challenges</Link>
          <Link to="/my-activities" className="block px-4 py-3 hover:bg-green-600 transition-colors">My Activities</Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="block px-4 py-3 hover:bg-green-600 transition-colors">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-3 hover:bg-green-600 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-3 hover:bg-green-600 transition-colors">Login</Link>
              <Link to="/register" className="block px-4 py-3 hover:bg-green-600 transition-colors">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
