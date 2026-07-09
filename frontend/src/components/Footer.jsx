import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-12 text-sm">

        {/* Company Info */}
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="Logo" />

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Welcome to our online store. We offer high-quality fashion,
            accessories, and lifestyle products with fast delivery and secure
            shopping. Our goal is to provide the best shopping experience for
            every customer.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-medium mb-5">COMPANY</h3>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>Collection</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-medium mb-5">GET IN TOUCH</h3>

          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 98765 43210</li>
            <li>support@yourstore.com</li>
            <li>Mon - Sat | 9:00 AM - 8:00 PM</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className="my-8" />

        <p className="py-5 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} YourStore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;