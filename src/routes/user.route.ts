import express from "express"
const { getUsers ,createUser,getUserById,updateUserById} = require("../controllers/user.controller");
const user_route = express.Router();

user_route.get("/", getUsers);
user_route.post("/",createUser);
user_route.get("/:id",getUserById)
user_route.patch("/:id",updateUserById)
module.exports = user_route;
