import express from "express";
import { createRole, getRoles , deleteRole } from "../controllers/roles.controller";
import { userAuth } from "../middleware/userAuth";
const roles_router = express.Router();

roles_router.get("/",getRoles);
roles_router.post("/",createRole)
roles_router.delete("/:id",deleteRole)

export default roles_router