import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import productValidationSchema from "./products.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodParsedProductData = productValidationSchema.parse(productData);

    const result = await ProductServices.createProductIntoDB(
      zodParsedProductData
    );

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

//get products by search query or normal query to get all
const getProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const products = await ProductServices.getProductsFromDB(
      searchTerm as string
    );

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term ${searchTerm} fetched successfully!`
        : "Products fetched successfully!",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

//get product by id

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Somwthing went wrong",
      error: error,
    });
  }
};

//update product

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body.product;

    const updatedProduct = await ProductServices.updateProductInDB(
      productId,
      productData
    );

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

//delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductServices.deleteProductFromDB(productId);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
