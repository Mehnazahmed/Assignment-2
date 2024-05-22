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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the product
        const product = yield products_model_1.Product.findById(orderData.productId);
        console.log("Retrieved Product:", product);
        if (!product) {
            throw new Error("Product not found");
        }
        // Check inventory
        if (product.inventory.quantity < orderData.quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        // Create the order
        const result = yield orders_model_1.Order.create(orderData);
        // Update the inventory
        product.inventory.quantity -= orderData.quantity;
        product.inventory.inStock = product.inventory.quantity > 0; // Update inStock based on quantity
        // Save the updated product
        yield product.save();
        return result;
    }
    catch (error) {
        throw new Error(`Unable to create order: ${error.message}`);
    }
});
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = email ? { email } : {};
        const orders = yield orders_model_1.Order.find(query);
        if (orders.length === 0) {
            throw new Error("Order not found");
        }
        return orders;
    }
    catch (error) {
        throw new Error(`Unable to fetch Orders: ${error.message}`);
    }
});
exports.OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
