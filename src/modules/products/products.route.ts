import express from "express";
import { ProductControllers } from "./products.controller";

const ruter = express.Router();

ruter.post("/create-product", ProductControllers.createProduct);
ruter.get("/", ProductControllers.getProducts);
ruter.get("/:productId", ProductControllers.getSingleProduct);
ruter.put("/:productId", ProductControllers.updateProduct);
ruter.delete("/:productId", ProductControllers.deleteProduct);

export const ProductRoutes = ruter;
