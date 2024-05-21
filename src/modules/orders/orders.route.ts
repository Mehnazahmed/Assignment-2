import express from "express";

const ruter = express.Router();

ruter.post("/create-order");
ruter.get("/");
ruter.get("/:productId");

export const ProductRoutes = ruter;
