import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const location = useLocation();

  const {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  } = useContext(ShopContext);

  // Show search bar only on Collection page
  if (location.pathname !== "/collection" || !showSearch) {
    return null;
  }

  return (
    <div className="border-y bg-gray-50 py-4">
      <div className="max-w-2xl mx-auto flex items-center gap-3 px-4">
        <div className="flex flex-1 items-center border border-gray-300 rounded-full bg-white px-4 py-3">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 bg-transparent outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            setShowSearch(false);
            setSearch("");
          }}
          className="text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SearchBar;