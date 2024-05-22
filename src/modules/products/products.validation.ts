import { z } from "zod";

// Zod schema for product variant
const productVariantSchema = z.object({
  type: z.string().min(1, { message: "Type must not be empty" }),
  value: z.string().min(1, { message: "Value must not be empty" }),
});

// Zod schema for product inventory
const productInventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .positive()
    .min(1, { message: "Quantity must be positive" }),
  inStock: z.boolean(),
});

//  Zod schema for product
const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Name must not be empty" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
  price: z
    .number()
    .positive()
    .min(0.01, { message: "Price must be greater than 0" }),
  category: z.string().min(1, { message: "Category must not be empty" }),
  tags: z.array(z.string().min(1, { message: "Tags must not be empty" })),
  variants: z.array(productVariantSchema, {
    message: "Variants must be provided",
  }),
  inventory: productInventorySchema,
});

export default productValidationSchema;
