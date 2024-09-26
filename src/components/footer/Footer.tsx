import React from 'react';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and About */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Go Car Wash</h2>
          <p className="text-gray-400">
            Your trusted partner for professional car washing services. We provide eco-friendly and high-quality washes at 150+ locations nationwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">Home</a>
            </li>
            <li>
              <a href="/services" className="hover:text-white">Services</a>
            </li>
            <li>
              <a href="/locations" className="hover:text-white">Locations</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info and Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p className="text-gray-400">
            123 Wash St, Clean City, 12345 <br />
            Phone: (123) 456-7890 <br />
            Email: info@gocarwash.com
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400">
              <FacebookFilled className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400">
              <InstagramFilled className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400">
              <TwitterCircleFilled className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Go Car Wash. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
