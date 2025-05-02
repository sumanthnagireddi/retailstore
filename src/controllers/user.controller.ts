import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt"
import * as JWT from "jsonwebtoken"
import { getJWTtoken } from "../middleware/userAuth";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().lean();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    if (!req.body.username) {
      throw new Error("Username is mandatory");
    }
    if (!req.body.password) {
      throw new Error("Password is mandatory")
    }
    const { password } = req.body
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      ...req.body,
      password: passwordHash
    }
    const savedUSer = await User.create(user);
    const jwtToken = await getJWTtoken(savedUSer)
    res.cookie("token", jwtToken)
    return res.status(201).json({ message: "User Added successfully!", data: savedUSer });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, payload, { new: true }).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully!", user: updatedUser });
  } catch (err) {
    next(err);
  }
};
