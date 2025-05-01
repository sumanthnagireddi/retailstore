import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";

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
    await User.create(payload);
    return res.status(201).json({ message: "User created successfully!" });
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
