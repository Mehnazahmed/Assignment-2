import mongoose from "mongoose";
import { TProduct } from "./products.interface";
import { Product } from "./products.model";

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);

  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductInDB = async (
  productId: string,
  productData: Partial<TProduct>
): Promise<TProduct | null> => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      productData,
      { new: true, runValidators: true }
    );
    return updatedProduct;
  } catch (error: any) {
    throw new Error(`Unable to update product: ${error.message}`);
  }
};

const deleteProductFromDB = async (productId: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  try {
    const result = await Product.findByIdAndDelete(productId);
    return result !== null;
  } catch (error: any) {
    throw new Error(`Unable to delete product: ${error.message}`);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
};
