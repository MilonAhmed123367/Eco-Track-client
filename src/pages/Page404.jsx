import React from "react";
import { Link } from "react-router-dom";
import erPage from '../assets/App-Error.png'

const Page404 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <img src={erPage} alt="" />
        <p className="text-xl mb-6">Page not found.</p>
        <Link to="/" className="text-green-600 hover:underline text-lg">Go Home</Link>
      </div>
    </div>
  );
};

export default Page404;
