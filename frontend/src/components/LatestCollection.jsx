import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const sortedProducts = [...products]
        .sort((a, b) => b.date - a.date)
        .slice(0, 10);

      setLatestProducts(sortedProducts);
    }
  }, [products]);

  return (
    <section className="my-16">
      <div className="text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />

        <p className="mt-3 mx-auto max-w-2xl text-sm text-gray-600">
          Discover our newest arrivals, featuring carefully selected products
          designed to bring style, comfort, and quality to your everyday life.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;