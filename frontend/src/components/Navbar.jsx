import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
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
              `flex flex-col items-center gap-1 ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden sm:block" />
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>COLLECTION</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden sm:block" />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden sm:block" />
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive ? "text-black" : ""
              }`
            }
          >
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[2px] bg-gray-700 hidden sm:block" />
          </NavLink>
        </ul>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer"
          />

          {/* Profile */}
          <div className="group relative">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer"
            />

            {token ? (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                  
                  <p
  onClick={() => navigate("/place-order")}
  className="cursor-pointer hover:text-black"
>
  My Profile
</p>

<p
  onClick={() => navigate("/orders")}
  className="cursor-pointer hover:text-black"
>
  Orders
</p>


                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <img
                  src={assets.profile_icon}
                  alt="Login"
                  className="hidden"
                />
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              alt="Cart"
              className="w-5 min-w-5"
            />

            <p className="absolute -right-2 -bottom-2 w-5 h-5 bg-black text-white rounded-full text-[10px] flex items-center justify-center">
              {getCartCount()}
            </p>
          </Link>

          {/* Mobile Menu */}
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
        className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 overflow-hidden ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700 w-64">

          <div
            className="flex items-center gap-3 p-4 cursor-pointer border-b"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Back"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>

          <NavLink
            to="/"
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
          >
            HOME
          </NavLink>

          <NavLink
            to="/collection"
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
          >
            COLLECTION
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
          >
            ABOUT
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;