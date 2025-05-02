import express from "express";
import { loginUser, logout } from "../controllers/auth.controller";

const auth_router = express.Router();

auth_router.post("/login",loginUser);
auth_router.get("/logout",logout)

export default auth_router