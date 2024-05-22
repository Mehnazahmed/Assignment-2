"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersControllers = void 0;
const orders_service_1 = require("./orders.service");
const orders_validation_1 = __importDefault(require("./orders.validation"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParsedOrderData = orders_validation_1.default.parse(orderData);
        const result = yield orders_service_1.OrderServices.createOrderIntoDB(zodParsedOrderData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error.message === "Insufficient stock") {
            res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: error.message || "Something went wrong",
                error,
            });
        }
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        const orders = yield orders_service_1.OrderServices.getOrdersFromDB(email);
        res.status(200).json({
            success: true,
            message: email
                ? "Orders fetched successfully for user email!"
                : "Orders fetched successfully!",
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message || error,
        });
    }
});
exports.OrdersControllers = {
    createOrder,
    getOrders,
};
