import userModel from "../models/userModel.js";

// ==========================
// Add Product To Cart
// ==========================
const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    if (!itemId || !size) {
      return res.json({
        success: false, 
        message: "Item ID and Size are required.",
      });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Added To Cart",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Cart
// ==========================
const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Cart Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get User Cart
// ==========================
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };