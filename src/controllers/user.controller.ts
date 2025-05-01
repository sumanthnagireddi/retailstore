import { Request, Response } from "express";
import User from "../models/User.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const createUser = await User.create(payload);
    res.status(201).json({ message: "User Created Succesfully!!!" });
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
