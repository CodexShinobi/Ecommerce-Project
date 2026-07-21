import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        let allItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrders(allItems.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  return (
    <div className="border-t pt-16">

      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="mt-8">

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            You haven't placed any orders yet.
          </div>
        ) : (
          orders.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* Product */}
              <div className="flex items-start gap-6">
                <img
                  className="w-20 sm:w-24 rounded"
                  src={item.image?.[0]}
                  alt={item.name}
                />

                <div>
                  <p className="font-medium text-base sm:text-lg">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                    <p>
                      {currency}
                      {item.price}
                    </p>

                    <p>Qty: {item.quantity}</p>

                    <p>Size: {item.size}</p>
                  </div>

                  <p className="mt-2 text-sm">
                    Date:{" "}
                    <span className="text-gray-500">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                  <p className="text-sm">
                    Payment:{" "}
                    <span className="text-gray-500">
                      {item.paymentMethod}
                    </span>
                  </p>

                  <p className="text-sm">
                    Payment Status:{" "}
                    <span
                      className={
                        item.payment
                          ? "text-green-600 font-medium"
                          : "text-orange-500 font-medium"
                      }
                    >
                      {item.payment ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>

                  <p className="text-sm md:text-base">
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={loadOrders}
                  className="border px-5 py-2 text-sm rounded hover:bg-gray-100 transition"
                >
                  Track Order
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Orders;