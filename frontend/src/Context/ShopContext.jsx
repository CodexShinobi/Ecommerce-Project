import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'
export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  // Search
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Fetch Products
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/product/list`
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getUserCart = async () => {
  try {
    const response = await axios.post(
      backendUrl + "/api/cart/get",
      {},
      {
        headers: { token },
      }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

// Add To Cart
const addToCart = async (itemId, size) => {
  if (!size) {
    toast.error("Please select a size");
    return;
  }

  let cartData = structuredClone(cartItems);

  if (!cartData[itemId]) {
    cartData[itemId] = {};
  }

  cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

  setCartItems(cartData);

  if (token) {
    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        {
          headers: { token },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }
};

  // Update Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
    if (token) {
  try {
    await axios.post(
      backendUrl + "/api/cart/update",
      {
        itemId,
        size,
        quantity,
      },
      {
        headers: { token },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
  };

  // Cart Count
  const getCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        totalCount += cartItems[item][size];
      }
    }

    return totalCount;
  };

  // Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const product = products.find(
        (product) => product._id === item
      );

      if (!product) continue;

      for (const size in cartItems[item]) {
        totalAmount +=
          product.price * cartItems[item][size];
      }
    }

    return totalAmount;
  };

  // Load Products
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
  }
}, []);

useEffect(() => {
  if (token) {
    getUserCart();
  }
}, [token]);

  const value = {
  products,
  currency,
  delivery_fee,

  cartItems,
  setCartItems,

  addToCart,
  updateQuantity,
  getUserCart,

  getCartCount,
  getCartAmount,

  backendUrl,
  token,
  setToken,

  search,
  setSearch,

  showSearch,
  setShowSearch,
};
  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;