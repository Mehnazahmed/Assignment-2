"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const products_service_1 = require("./products.service");
const products_validation_1 = __importDefault(require("./products.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodParsedProductData = products_validation_1.default.parse(productData);
        const result = yield products_service_1.ProductServices.createProductIntoDB(zodParsedProductData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
//get products by search query or normal query to get all
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const products = yield products_service_1.ProductServices.getProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term ${searchTerm} fetched successfully!`
                : "Products fetched successfully!",
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message || error,
        });
    }
});
//get product by id
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.getSingleProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Somwthing went wrong",
            error: error,
        });
    }
});
//update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body.product;
        const updatedProduct = yield products_service_1.ProductServices.updateProductInDB(productId, productData);
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message || error,
        });
    }
});
//delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield products_service_1.ProductServices.deleteProductFromDB(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product deleted successfully!",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message || error,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
