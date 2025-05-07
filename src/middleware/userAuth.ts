import { NextFunction, RequestHandler } from "express";
import * as JWT from "jsonwebtoken"
import UserModel from "../models/User.model";
import { REQUEST } from "../Interfaces/errorInterface";
const SECRET_KEY = 'ba9f61c449273e2e6f86f2362b8bda88a45786b50e7b7cbc8f76d5ced6ddbeb9'

export const userAuth: RequestHandler = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            const error = new Error("Please login")
            return next(error)
        }
        const decodeUser: any = await JWT.verify(token, SECRET_KEY);
        const { _id } = decodeUser;
        const user = await UserModel.findById(_id)
        if (!user) {
            const error = new Error("User not found")
            return next(error)
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const getJWTtoken = async (payload: any) => {
    const token = JWT.sign({ _id: payload._id }, SECRET_KEY)
    return token
}