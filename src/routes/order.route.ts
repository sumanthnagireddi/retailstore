import express from "express";
import { userAuth } from "../middleware/userAuth";
import {
  getOrders,
  createOrder,
  getOrderById,
  getUserOrders,
  deleteOrder,
  updateOrderDetails,
  getPaymentStatus,
  updateOrderStatus
} from "../controllers/orders.controller";

const orders_router = express.Router();

orders_router.get("/users/:user_id", getUserOrders); 
orders_router.get("/", getOrders);
orders_router.post("/", createOrder);
orders_router.get("/:id", getOrderById); 
orders_router.delete("/:id",deleteOrder)
orders_router.patch("/:id",updateOrderDetails);
orders_router.get("/payment_status/:order_id",getPaymentStatus)
orders_router.patch("/update_order_status/:id",updateOrderStatus)
export default orders_router;
