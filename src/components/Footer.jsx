
import React from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaInstagram, FaLeaf, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Contact Us</h4>
            <p>Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a></p>
            <p>Phone: <a href="tel:+8801XXXXXXXXX" className="hover:text-white">+880 1X XXX XXXX</a></p>
            <p>Address: 123, Dhaka, Bangladesh</p>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Follow Us</h4>
            <ul className="flex space-x-4 text-2xl">
              <li><a href="" target="_blank" rel="noopener noreferrer" className="hover:text-white"><CiFacebook /></a></li>
              <li><a href="" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a></li>
              <li><a href="" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a></li>
              <li><a href="" target="_blank" rel="noopener noreferrer" className="hover:text-white"><CiLinkedin /></a></li>
            </ul>
          </div>

         
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-500 flex justify-center gap-3"><FaLeaf /> 2025 Eco-Track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
