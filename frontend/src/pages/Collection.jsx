import React, { useContext, useMemo, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let items = [...products];

    // Search
    if (showSearch && search.trim() !== "") {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (category.length > 0) {
      items = items.filter((item) =>
        category.includes(item.category)
      );
    }

    // Sub Category
    if (subCategory.length > 0) {
      items = items.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sorting
    switch (sortType) {
      case "low-high":
        items.sort((a, b) => a.price - b.price);
        break;

      case "high-low":
        items.sort((a, b) => b.price - a.price);
        break;

      case "latest":
        items.sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );
        break;

      default:
        break;
    }

    return items;
  }, [
    products,
    search,
    showSearch,
    category,
    subCategory,
    sortType,
  ]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t">
      {/* Filters */}
      <aside className="min-w-60">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="sm:hidden border px-4 py-2 rounded mb-4"
        >
          Filters
        </button>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          {/* Category */}
          <div className="border p-4 mb-5">
            <h3 className="font-semibold mb-3">Categories</h3>

            {["Men", "Women", "Kids"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={category.includes(item)}
                  onChange={() => toggleCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>

          {/* Sub Category */}
          <div className="border p-4">
            <h3 className="font-semibold mb-3">Sub Categories</h3>

            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={subCategory.includes(item)}
                  onChange={() => toggleSubCategory(item)}
                />
                {item}
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
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border px-3 py-2 rounded outline-none"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="latest">Latest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Collection;