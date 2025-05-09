import { NextFunction, Request, Response } from "express"
import orderModel from "../models/Order.model"

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderModel.find({})
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const createOrder = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const order_payload=req.body
        const orders = await orderModel.create(order_payload)
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const getOrderById = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const order_id=req.params.id;
        const orders=await orderModel.findById(order_id)
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const getUserOrders = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const user_id=req.params.user_id;
        console.log(user_id)
        const orders= await orderModel.find({user:user_id})
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}