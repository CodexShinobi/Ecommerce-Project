import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";


const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products
        .filter((product) => product.bestseller === true)
        .slice(0, 5);

      setBestSellerProducts(filteredProducts);
    }
  }, [products]);

  return (
    <section className="my-16">
      <div className="text-center">
        <Title text1="BEST" text2="SELLERS" />

        <p className="w-3/4 m-auto mt-3 text-sm text-gray-600 sm:text-base">
          Discover our most-loved products, carefully selected based on customer
          favorites and outstanding quality.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
        {bestSellerProducts.map((product) => (
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

export default BestSeller;