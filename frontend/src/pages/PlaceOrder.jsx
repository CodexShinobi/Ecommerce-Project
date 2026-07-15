import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    cartItems,
    products,
    delivery_fee,
    getCartAmount,
    setCartItems,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("COD");

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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const initPay=(order)=>{
const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  name: "Order Payment",
  description: "Order Payment",
  order_id: order.id,   // <-- REQUIRED
  receipt: order.receipt,

  handler: async (response) => {
    try {
      const verifyResponse = await axios.post(
        backendUrl + "/api/order/verifyRazorpay",
        response,
        {
          headers: { token },
        }
      );

      if (verifyResponse.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(verifyResponse.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
    
    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const product = products.find((item) => item._id === itemId);

        if (!product) continue;

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            orderItems.push({
              ...product,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "COD": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            {
              headers: { token },
            }
          );

          if (response.data.success) {
            toast.success("Order Placed Successfully");

            setCartItems({});

            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
        }

        case "Stripe": {
  const response = await axios.post(
    backendUrl + "/api/order/stripe",
    orderData,
    {
      headers: { token },
    }
  );

  if (response.data.success) {
    window.location.replace(response.data.session_url);
  } else {
    toast.error(response.data.message);
  }

  break;
}

        case "Razorpay": {
  const response = await axios.post(
    backendUrl + "/api/order/razorpay",
    orderData,
    {
      headers: { token },
    }
  );

 if (response.data.success) {
    initPay(response.data.order);
} else {
    toast.error(response.data.message);
}

  break;
}
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
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full lg:max-w-xl">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="flex gap-3">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="First Name"
          />

          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className="border rounded px-4 py-2"
          placeholder="Email Address"
        />

        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className="border rounded px-4 py-2"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="City"
          />

          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="Zip Code"
          />

          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className="border rounded px-4 py-2 w-full"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className="border rounded px-4 py-2"
          placeholder="Phone Number"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:max-w-md">
        <CartTotal />

        <div className="mt-10">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex flex-col gap-3 mt-5">
            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input
                type="radio"
                value="COD"
                checked={method === "COD"}
                onChange={(e) => setMethod(e.target.value)}
              />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input
                type="radio"
                value="Stripe"
                checked={method === "Stripe"}
                onChange={(e) => setMethod(e.target.value)}
              />
              Stripe
            </label>

            <label className="flex items-center gap-3 border rounded p-3 cursor-pointer">
              <input
                type="radio"
                value="Razorpay"
                checked={method === "Razorpay"}
                onChange={(e) => setMethod(e.target.value)}
              />
              Razorpay
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;