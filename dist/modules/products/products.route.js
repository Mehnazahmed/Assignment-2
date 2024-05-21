"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const ruter = express_1.default.Router();
ruter.post("/create-product", products_controller_1.ProductControllers.createProduct);
ruter.get("/", products_controller_1.ProductControllers.getAllProducts);
ruter.get("/:productId", products_controller_1.ProductControllers.getSingleProduct);
exports.ProductRoutes = ruter;
