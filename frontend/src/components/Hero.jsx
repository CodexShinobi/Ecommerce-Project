import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-8 py-12 md:px-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-gray-800"></span>
            <p className="uppercase tracking-widest text-sm text-gray-600">
              New Collection
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Elevate Your
            <br />
            Everyday Style
          </h1>

          <p className="mt-6 text-gray-600 leading-7 max-w-md">
            Discover premium fashion for men, women, and kids. Explore our
            latest arrivals, timeless essentials, and trending collections.
          </p>

          <div className="mt-8">
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              Shop Now
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="h-full">
          <img
            src={assets.hero_img}
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;