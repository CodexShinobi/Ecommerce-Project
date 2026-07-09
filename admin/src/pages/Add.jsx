import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);

        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
 
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-4"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2">Upload Images</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((item) => (
            <label htmlFor={`image${item}`} key={item}>
              <img
                className="w-20 cursor-pointer border rounded"
                src={
                  item === 1
                    ? image1
                      ? URL.createObjectURL(image1)
                      : assets.upload_area
                    : item === 2
                    ? image2
                      ? URL.createObjectURL(image2)
                      : assets.upload_area
                    : item === 3
                    ? image3
                      ? URL.createObjectURL(image3)
                      : assets.upload_area
                    : image4
                    ? URL.createObjectURL(image4)
                    : assets.upload_area
                }
                alt=""
              />

              <input
                type="file"
                id={`image${item}`}
                hidden
                onChange={(e) => {
                  if (item === 1) setImage1(e.target.files[0]);
                  if (item === 2) setImage2(e.target.files[0]);
                  if (item === 3) setImage3(e.target.files[0]);
                  if (item === 4) setImage4(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>

        <input
          className="w-full max-w-[500px] px-3 py-2 border"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>

        <textarea
          className="w-full max-w-[500px] px-3 py-2 border"
          rows={4}
          placeholder="Write content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <p className="mb-2">Category</p>

          <select
            className="px-3 py-2 border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>

          <select
            className="px-3 py-2 border"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>

          <input
            className="px-3 py-2 border w-28"
            type="number"
            placeholder="25"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>

        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-3 py-1 cursor-pointer rounded ${
                  sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />

        <p>Add to Bestseller</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-32 py-3 mt-4 bg-black text-white rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;