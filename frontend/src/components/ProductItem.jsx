import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="truncate text-sm font-medium text-gray-800">
          {name}
        </h3>

        <p className="mt-2 text-lg font-semibold text-black">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;