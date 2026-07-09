import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const toggleSubCategory = (subcategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((item) => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (selectedCategories.length) {
      data = data.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    if (selectedSubCategories.length) {
      data = data.filter((item) =>
        selectedSubCategories.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        data.sort((a, b) => b.price - a.price);
        break;

      case "latest":
        data.sort((a, b) => b.date - a.date);
        break;

      default:
        break;
    }

    return data;
  }, [products, selectedCategories, selectedSubCategories,search,showSearch, category,subCategory,sortType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t">
      {/* Filters */}
      <aside className="min-w-60">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="sm:hidden mb-4 border px-4 py-2 rounded"
        >
          Filters
        </button>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <div className="border p-4 mb-5">
            <h3 className="font-semibold mb-3">Categories</h3>

            {["Men", "Women", "Kids"].map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 mb-2"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="border p-4">
            <h3 className="font-semibold mb-3">Sub Categories</h3>

            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2 mb-2"
              >
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(sub)}
                  onChange={() => toggleSubCategory(sub)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Products */}
      <section className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            className="border px-3 py-2"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Relevant</option>
            <option value="latest">Latest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;