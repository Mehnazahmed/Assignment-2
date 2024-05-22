"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Zod schema for product variant
const productVariantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type must not be empty" }),
    value: zod_1.z.string().min(1, { message: "Value must not be empty" }),
});
// Zod schema for product inventory
const productInventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .positive()
        .min(1, { message: "Quantity must be positive" }),
    inStock: zod_1.z.boolean(),
});
//  Zod schema for product
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name must not be empty" }),
    description: zod_1.z.string().min(1, { message: "Description must not be empty" }),
    price: zod_1.z
        .number()
        .positive()
        .min(0.01, { message: "Price must be greater than 0" }),
    category: zod_1.z.string().min(1, { message: "Category must not be empty" }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: "Tags must not be empty" })),
    variants: zod_1.z.array(productVariantSchema, {
        message: "Variants must be provided",
    }),
    inventory: productInventorySchema,
});
exports.default = productValidationSchema;
