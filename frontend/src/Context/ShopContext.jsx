import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token,setToken] = useState('')

  // Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart
  const addToCart = (itemId, size) => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    setCartItems(cartData);
  };

  // Update Quantity
  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // Cart Count
  const getCartCount = () => {
    let count = 0;

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        count += cartItems[item][size];
      }
    }

    return count;
  };

  // Cart Amount
  const getCartAmount = () => {
    let total = 0;

    for (const item in cartItems) {
      const product = products.find((p) => p._id === item);

      if (!product) continue;

      for (const size in cartItems[item]) {
        total += product.price * cartItems[item][size];
      }
    }

    return total;
  };

  useEffect(() => {
    getProductsData();
  }, []);
// useEffect(()=>{
//   if(!token && localStorage.getItem('token')){
//     setToken(localStorage.getItem('token'))
//   }
// },[])
  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    backendUrl,
    setToken,token
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;