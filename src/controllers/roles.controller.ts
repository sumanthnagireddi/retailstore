import { NextFunction, Request, Response } from "express"
import rolesModel from "../models/roles.model"

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await rolesModel.find({})
        res.status(200).json(roles)
    } catch (error) {
        next(error)
    }
}

export const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.body;
        const createUser = await rolesModel.create(role);
        res.status(201).json({ message: "Created Succesfully" })
    } catch (error) {
        next(error)
    }
}

export const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleId = req.params.id;
        const createUser = await rolesModel.findByIdAndDelete(roleId);
        res.status(200).json({ message: "Deleted Succesfully" })
    } catch (error) {
        next(error)
    }
}
