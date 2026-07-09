import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();

  const { products, currency, addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      const item = products.find((p) => p._id === productId);

      if (item) {
        setProduct(item);

        if (item.image && item.image.length > 0) {
          setSelectedImage(item.image[0]);
        }
      }
    }

    window.scrollTo(0, 0);
  }, [productId, products]);

  if (!product) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-auto">
            {product.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.name}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  selectedImage === img
                    ? "border-black"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex-1">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full rounded-lg border"
            />
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-1 mt-4 text-yellow-500">
            ★★★★★
            <span className="text-gray-500 text-sm ml-2">
              (124 Reviews)
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold">
            {currency}
            {product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-7">
            {product.description}
          </p>

          {product.sizes && (
            <>
              <h3 className="mt-8 font-semibold">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3 mt-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 border rounded transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}

          <button
            onClick={() => addToCart(product._id, selectedSize)}
            className="mt-8 bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          <hr className="my-8" />

          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ 100% Original Products</p>
            <p>✓ Cash on Delivery Available</p>
            <p>✓ Easy 7-Day Returns & Exchanges</p>
            <p>✓ Secure Payment & Fast Delivery</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-20">
        <div className="flex gap-6 border-b">
          <button className="py-4 font-semibold border-b-2 border-black">
            Description
          </button>

          <button className="py-4 text-gray-500">
            Reviews (124)
          </button>
        </div>

        <div className="py-8 text-gray-600 leading-7">
          <p>
            This product is crafted using premium materials to ensure comfort,
            durability, and modern style. Designed for everyday wear, it
            combines functionality with a clean, timeless look.
          </p>

          <p className="mt-4">
            Please refer to the size guide before purchasing. Actual product
            color may vary slightly depending on your screen settings.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
        currentProductId={product._id}
      />
    </div>
  );
};

export default Product;