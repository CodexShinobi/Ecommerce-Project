import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const {
    backendUrl,
    token,
    cartItems,
    products,
    delivery_fee,
    getCartAmount,
    setCartItems,
    navigate,
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const product = products.find((p) => p._id === itemId);

        if (!product) continue;

        for (const size in cartItems[itemId]) {
          orderItems.push({
            ...product,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod,
      };

      const response = await axios.post(
        `${backendUrl}/api/order/place`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");

        setCartItems({});

        if (navigate) {
          navigate("/orders");
        }
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
      className="flex flex-col lg:flex-row justify-between gap-10 border-t pt-10"
    >
      {/* Delivery Information */}
      <div className="flex flex-col gap-4 w-full lg:max-w-xl">
        <Title text1="DELIVERY" text2="INFORMATION" align="left" />

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            className="border rounded px-4 py-2 w-full"
            required
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="border rounded px-4 py-2"
          required
        />

        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="border rounded px-4 py-2"
          required
        />

        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="border rounded px-4 py-2 w-full"
            required
          />

          <input
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            className="border rounded px-4 py-2 w-full"
            required
          />

          <input
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="border rounded px-4 py-2 w-full"
            required
          />
        </div>

        <input
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone Number"
          className="border rounded px-4 py-2"
          required
        />
      </div>

      {/* Order Summary */}
      <div className="w-full lg:max-w-md">
        <CartTotal />

        <div className="mt-8">
          <Title text1="PAYMENT" text2="METHOD" align="left" />

          <div className="mt-4 flex flex-col gap-3">
            <label className="border rounded p-3 flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="border rounded p-3 flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Online Payment
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;