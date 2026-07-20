import express from "express";
import {
  placeOrder,
  userOrders,
  allOrders,
  updateStatus,
  placeOrderRazorpay,
  placeOrderStripe,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderController.js";

import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminauth.js";

const orderRouter = express.Router();

// User Route

// Admin Routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
export default orderRouter;
