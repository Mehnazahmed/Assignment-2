"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
//  Zod schema for order
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    productId: zod_1.z.string({ message: "Product ID must be a string" }),
    price: zod_1.z.number().positive({ message: "Price must be a positive number" }),
    quantity: zod_1.z
        .number()
        .int()
        .positive({ message: "Quantity must be a positive integer" }),
});
exports.default = orderValidationSchema;
