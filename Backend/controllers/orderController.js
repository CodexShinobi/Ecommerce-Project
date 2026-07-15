import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";
import Razorpay from "razorpay";
import crypto from "crypto";
// import products from "razorpay/dist/types/products.js";
const currency='inr'
const deliveryCharge = 50;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// ================================
const placeOrder = async (req, res) => {
  try {
    

    
    const userId = req.userId;
const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear User Cart
    await userModel.findByIdAndUpdate(userId, {
      cartData: {}
    })

    res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    return res.json({
      success: true,
      session_url: session.url,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const userId = req.userId;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });

      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });

      return res.json({
        success: true,
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);

        return res.json({
          success: false,
          message: error.message,
        });
      }

      return res.json({
        success: true,
        order,
      });
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    console.log(orderInfo);

    return res.json({
      success: true,
      orderInfo,
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// ================================
// Place Order (Cash On Delivery)

// ================================
// User Orders
// ================================
const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Admin - All Orders
// ================================
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Update Order Status
// ================================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status,
    });

    res.json({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  userOrders,
  allOrders,
  updateStatus,
};