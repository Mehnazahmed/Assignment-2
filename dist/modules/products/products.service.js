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
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_model_1 = require("./products.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(productData);
    return result;
});
const getProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
                { tags: { $regex: searchTerm, $options: "i" } },
            ],
        }
        : {};
    try {
        const products = yield products_model_1.Product.find(query);
        if (products.length === 0) {
            throw new Error("No products match the search term");
        }
        return products;
    }
    catch (error) {
        throw new Error(`Unable to fetch products: ${error.message}`);
    }
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(id);
    return result;
});
const updateProductInDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID");
    }
    try {
        const updatedProduct = yield products_model_1.Product.findByIdAndUpdate(productId, productData, { new: true, runValidators: true });
        return updatedProduct;
    }
    catch (error) {
        throw new Error(`Unable to update product: ${error.message}`);
    }
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new Error("Invalid product ID");
    }
    try {
        const result = yield products_model_1.Product.findByIdAndDelete(productId);
        return result !== null;
    }
    catch (error) {
        throw new Error(`Unable to delete product: ${error.message}`);
    }
});
exports.ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
};
