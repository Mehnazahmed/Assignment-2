import { z } from "zod";

//  Zod schema for order
const orderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  productId: z.string({ message: "Product ID must be a string" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer" }),
});

export default orderValidationSchema;
