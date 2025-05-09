import express from "express";
import { userAuth } from "../middleware/userAuth";
import { getOrders, createOrder, getOrderById, getUserOrders } from "../controllers/orders.controller";
const orders_router = express.Router();

orders_router.get("/", getOrders);
orders_router.post("/", createOrder)
orders_router.get("/:id", getOrderById)
orders_router.get("/users/:user_id", getUserOrders)
export default orders_router