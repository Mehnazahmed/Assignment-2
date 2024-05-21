import { Schema } from "mongoose";
import {
  TProduct,
  TProductInventory,
  TProductVariant,
} from "./products.interface";
import { model } from "mongoose";

const productVariantSchema = new Schema<TProductVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const productInventorySchema = new Schema<TProductInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [productVariantSchema], required: true },
  inventory: { type: productInventorySchema, required: true },
});

export const Product = model<TProduct>("Product", productSchema);
