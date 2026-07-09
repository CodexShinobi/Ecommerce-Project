import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({
  category,
  subCategory,
  currentProductId,
}) => {
  const { products } = useContext(ShopContext);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products
        .filter(
          (item) =>
            item._id !== currentProductId &&
            item.category === category &&
            item.subCategory === subCategory
        )
        .slice(0, 4);

      setRelatedProducts(filteredProducts);
    }
  }, [products, category, subCategory, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="my-20">
      <div className="text-center mb-10">
        <Title text1="RELATED" text2="PRODUCTS" />

        <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
          You may also like these products from the same collection.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
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

export default RelatedProducts;