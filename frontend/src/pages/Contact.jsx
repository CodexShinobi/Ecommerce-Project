import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    updateQuantity,
  } = useContext(ShopContext);

  const cartProducts = [];

  products.forEach((product) => {
    if (cartItems[product._id]) {
      Object.keys(cartItems[product._id]).forEach((size) => {
        cartProducts.push({
          ...product,
          size,
          quantity: cartItems[product._id][size],
        });
      });
    }
  });

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-8">
        <Title text1="YOUR" text2="CART" align="left" />
      </div>

      {cartProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>

          <Link
            to="/collection"
            className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-md"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cartProducts.map((item) => (
            <div
              key={`${item._id}-${item.size}`}
              className="grid grid-cols-[4fr_1fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center border-b py-4"
            >
              <div className="flex items-start gap-5">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h3 className="font-medium">{item.name}</h3>

                  <div className="flex items-center gap-3 mt-2">
                    <p>
                      {currency}
                      {item.price}
                    </p>

                    <span className="px-2 py-1 border text-sm bg-gray-100">
                      {item.size}
                    </span>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item._id,
                    item.size,
                    Number(e.target.value)
                  )
                }
                className="border w-20 px-2 py-1"
              />

              <button
                onClick={() =>
                  updateQuantity(item._id, item.size, 0)
                }
                className="text-red-600 font-semibold hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-end mt-10">
            <div className="w-full sm:w-[450px]">
              <CartTotal />

              <div className="text-right mt-6">
                <Link
                  to="/place-order"
                  className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;