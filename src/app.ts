import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./modules/products/products.route";
import { OrderRoutes } from "./modules/orders/orders.route";

//parser
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

export default app;
