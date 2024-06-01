import express from "express";
import { OrdersControllers } from "./orders.controller";

const router = express.Router();

//order routes
router.post("/", OrdersControllers.createOrder);
router.get("/", OrdersControllers.getOrders);

export const OrderRoutes = router;
