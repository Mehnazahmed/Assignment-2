import { TOrder } from "./orders.interface";
import { Order } from "./orders.model";

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Order.create(orderData);

  return result;
};

const getOrdersFromDB = async (email?: string) => {
  try {
    const query = email ? { email } : {};
    const orders = await Order.find(query);
    return orders;
  } catch (error: any) {
    throw new Error(`Unable to fetch Orders: ${error.message}`);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getOrdersFromDB,
};
