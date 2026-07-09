import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-lg font-semibold">All Products List</p>

      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[0.8fr_2fr_1fr_1fr_1fr_0.5fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Action</span>
        </div>

        {/* Products */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[0.8fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-2 py-2 px-3 border text-sm"
          >
            <img
              className="w-14 h-14 object-cover"
              src={item.image[0]}
              alt={item.name}
            />

            <p>{item.name}</p>

            <p>{item.category}</p>
            <p>{currency}</p>

            <p>₹{item.price}</p>

            <p>{item.sizes.join(", ")}</p>

            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-600 font-bold hover:text-red-800"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;