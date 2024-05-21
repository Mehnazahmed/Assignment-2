import express from "express";
import { ProductControllers } from "./products.controller";

const ruter = express.Router();

ruter.post("/create-product", ProductControllers.createProduct);
ruter.get("/", ProductControllers.getAllProducts);
ruter.get("/:productId", ProductControllers.getSingleProduct);

export const ProductRoutes = ruter;
