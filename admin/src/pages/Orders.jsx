import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = ({ token, backendUrl }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 border rounded-lg p-5 shadow-sm bg-white"
          >
            {/* Icon */}
            <div className="flex items-start justify-center">
              <span className="text-4xl">📦</span>
            </div>

            {/* Order Details */}
            <div>
              <div>
                {order.items.map((item, index) => (
                  <p key={index} className="font-medium">
                    {item.name} × {item.quantity}
                    <span className="text-gray-500">
                      {" "}
                      ({item.size})
                    </span>
                  </p>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-700">
                <p className="font-semibold">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <p>{order.address.street}</p>

                <p>
                  {order.address.city}, {order.address.state}
                </p>

                <p>
                  {order.address.country} - {order.address.zipcode}
                </p>

                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Payment */}
            <div className="text-sm space-y-2">
              <p>
                <span className="font-semibold">Items:</span>{" "}
                {order.items.length}
              </p>

              <p>
                <span className="font-semibold">Method:</span>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? (
                  <span className="text-green-600">Done</span>
                ) : (
                  <span className="text-red-600">Pending</span>
                )}
              </p>

              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <div className="flex items-center text-lg font-semibold">
              ₹{order.amount}
            </div>

            {/* Status */}
            <div className="flex items-center">
              <select
                value={order.status}
                onChange={(event) =>
                  statusHandler(event, order._id)
                }
                className="border rounded px-3 py-2 w-full"
              >
                <option value="Order Placed">
                  Order Placed
                </option>
                <option value="Packing">
                  Packing
                </option>
                <option value="Shipped">
                  Shipped
                </option>
                <option value="Out for Delivery">
                  Out for Delivery
                </option>
                <option value="Delivered">
                  Delivered
                </option>
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;