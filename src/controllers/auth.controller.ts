import { NextFunction, Request, Response } from "express"
import UserModel from "../models/User.model"
import bcrypt from "bcrypt"
import { getJWTtoken } from "../middleware/userAuth"

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username: username })
        if (!user) {
            const error = new Error("User not found")
            return next(error)
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            const error = new Error("Invalid Credentials")
            return next(error)
        }
        const jwtToken = await getJWTtoken(user);
        res.cookie("token", jwtToken);
        res.json({ message: "Authentication Succesfull" })
    } catch (error) {
        next(error)
    }
}


export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("token");
        res.json({ message: "Logged out succesfully!!!" })
    } catch (error) {
        next(error)
    }
}   