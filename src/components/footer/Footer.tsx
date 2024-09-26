import React from 'react';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Quick Links Section */}
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors duration-300">Services</a>
              </li>
              <li>
                <a href="/locations" className="hover:text-white transition-colors duration-300">Locations</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors duration-300">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <img
              src="https://i.ibb.co/fDQjM72/Logo-White.png" // Replace with Go Car Wash logo URL
              alt="Go Car Wash Logo"
              className="w-36 md:w-44"
            />
            <div className="flex space-x-6 text-2xl text-gray-400 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300">
                <FacebookFilled />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
                <InstagramFilled />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
                <TwitterCircleFilled />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="text-center md:text-right space-y-4">
            <h3 className="text-lg font-semibold uppercase tracking-wide">Contact Us</h3>
            <p className="text-gray-400">
              123 Wash St,<br />
              Clean City, 12345<br />
              Phone: (123) 456-7890<br />
              Email: <a href="mailto:info@gocarwash.com" className="hover:text-white">info@gocarwash.com</a>
            </p>
          </div>
        </div>

        {/* Divider and Copyright Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Go Car Wash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
