import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./modules/products/products.route";
import { ProductControllers } from "./modules/products/products.controller";

//parser
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);
app.put("/api/products/:productId", ProductControllers.updateProduct);
app.delete("/api/products/:productId", ProductControllers.deleteProduct);

export default app;
