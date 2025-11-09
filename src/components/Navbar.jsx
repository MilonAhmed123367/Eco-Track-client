import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <Link to="/" className="flex items-center text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#9E1C60] to-[#811844]">
            <span className="mr-2">♻️</span>
            EcoTrack
          </Link>
        </div>

        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="text-[#811844] hover:text-[#2b0213] transition- font-semibold text-md hover:bg-gradient-to-r from-[#9E1C60] to-[#811844] hover:p-1 hover:text-white rounded">Home</Link>

          <Link to="/challenges" className="text-[#811844] hover:text-[#2b0213] transition- font-semibold text-md hover:bg-gradient-to-r from-[#9E1C60] to-[#811844] hover:p-1 hover:text-white rounded">Challenges</Link>

          <Link to="/my-activities" className="text-[#811844] hover:text-[#2b0213] transition- font-semibold text-md hover:bg-gradient-to-r from-[#9E1C60] to-[#811844] hover:p-1 hover:text-white rounded">My Activities</Link>

          <Link to="/login" className="px-4 py-2 rounded bg-gradient-to-r from-[#9E1C60] to-[#811844] text-white ml-4">Login</Link>
        </div>

        {/* মোবাইলে হ্যামবার্গার মেনু হলে: */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-green-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
