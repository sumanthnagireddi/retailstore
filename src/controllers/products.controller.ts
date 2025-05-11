import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/Product.model";
import { Error } from "mongoose";
import { CustomError } from "../Interfaces/errorInterface";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductModel.find({});
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
        const product_body = req.body
        if (Array.isArray(product_body)) {
            const products = await ProductModel.insertMany(product_body);
             res.status(201).json({
                message: "Products Created successfully!",
                data: products,
            });
        }
        const product = await ProductModel.create(product_body);
        res.status(200).json({
            message: "Product Created successfully!",
            data: product,
        })
    } catch (error:any) {
        next(error)
    }
}


export const getProductByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id } = req.params
        const product = await ProductModel.findById(product_id)
        if (!product) {
            res.status(404).json({
                message: "Product not found!",
                data: [],
            })
        }
        res.status(200).json({
            message: "Product Fetched successfully!",
            data: product,
        })
    } catch (error) {
        next(error)
    }
}

export const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id } = req.params
        const product_body = req.body
        const product = await ProductModel.findByIdAndUpdate(product_id, product_body, { new: true })
        if (!product) {
            res.status(404).json({
                message: "Product not found,Can't Update the product.",
                data: [],
            })
        }
        res.status(200).json({
            message: "Product Updated successfully!",
            data: product,
        })
    } catch (error) {
        next(error)
    }
}


export const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_name } = req.params
        const products = await ProductModel.find({ category: category_name })
        if (!products) {
            res.status(404).json({
                message: "Product not found!",
                data: [],
            })
        }
        res.status(200).json({
            message: "Products Fetched successfully!",
            data: products,
        })
    } catch (error) {
        next(error)
    }
}
