import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-32"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden" />
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden" />
          </NavLink>
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer"
          />

          <Link to="/login">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer"
            />
          </Link>

          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 min-w-5"
            />

            <p className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center rounded-full bg-black text-white text-[10px]">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu Button */}
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 overflow-hidden ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700">
          <div
            className="flex items-center gap-3 p-4 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt=""
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;