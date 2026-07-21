import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } =
    useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = subtotal > 0 ? delivery_fee : 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="mt-6 flex flex-col gap-4 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span>Shipping Fee</span>
          <span>
            {currency}
            {shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;