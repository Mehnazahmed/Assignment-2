import express, { Application } from "express";
const app: Application = express();
import cors from "cors";
import { ProductRoutes } from "./modules/products/products.route";

//parser
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);

export default app;
