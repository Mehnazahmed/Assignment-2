"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post("/create-product", products_controller_1.ProductControllers.createProduct);
router.get("/", products_controller_1.ProductControllers.getProducts);
router.get("/:productId", products_controller_1.ProductControllers.getSingleProduct);
router.put("/:productId", products_controller_1.ProductControllers.updateProduct);
router.delete("/:productId", products_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
