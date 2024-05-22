import { Product } from "../products/products.model";
import { TOrder } from "./orders.interface";
import { Order } from "./orders.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  try {
    // Find the product
    const product = await Product.findById(orderData.productId);
    console.log("Retrieved Product:", product);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check inventory
    if (product.inventory.quantity < orderData.quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Create the order
    const result = await Order.create(orderData);

    // Update the inventory
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0; // Update inStock based on quantity
    console.log("Updated Inventory before saving:", product.inventory);

    // Save the updated product
    await product.save();
    const updatedProduct = await Product.findById(orderData.productId);
    console.log("Product after save:", updatedProduct);

    return result;
  } catch (error: any) {
    throw new Error(`Unable to create order: ${error.message}`);
  }
};

const getOrdersFromDB = async (email?: string) => {
  try {
    const query = email ? { email } : {};
    const orders = await Order.find(query);
    if (orders.length === 0) {
      throw new Error("Order not found");
    }
    return orders;
  } catch (error: any) {
    throw new Error(`Unable to fetch Orders: ${error.message}`);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
