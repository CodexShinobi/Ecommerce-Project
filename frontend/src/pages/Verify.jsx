import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";


const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    backendUrl,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        {
          success,
          orderId,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment Successful");
        navigate("/orders");
      } else {
        toast.error(response.data.message);
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
      navigate("/cart");
    }
  };

  useEffect(() => {
    if (token) {
      verifyPayment();
    }
  }, [token]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>

        <p className="mt-5 text-lg font-medium">
          Verifying Payment...
        </p>
      </div>
    </div>
  );
};

export default Verify;