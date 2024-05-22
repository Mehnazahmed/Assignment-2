import { Request, Response } from "express";
import { OrderServices } from "./orders.service";
import { TOrder } from "./orders.interface";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrder = req.body;

    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Insufficient stock") {
      res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    } else {
      res.status(500).json({
        success: false,
        message: error.message || "Something went wrong",
        error,
      });
    }
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const orders = await OrderServices.getOrdersFromDB(email as string);

    res.status(200).json({
      success: true,
      message: email
        ? "Orders fetched successfully for user email!"
        : "Orders fetched successfully!",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

export const OrdersControllers = {
  createOrder,
  getOrders,
};
