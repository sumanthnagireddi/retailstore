import { NextFunction, Request ,Response} from "express";
import ProductModel from "../models/Product.model";

export const getProducts =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products= await ProductModel.find({});
        res.status(200).json({
            message: "Products Fetched successfully!",
            data: products,
        })
    } catch (error) {
        next(error)
    }
}


export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product_body=req.body
        const product= await ProductModel.create(product_body);
        res.status(200).json({
            message: "Product Created successfully!",
            data: product,
        })
    } catch (error) {
        next(error)
    }
}
