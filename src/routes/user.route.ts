import express from "express"
const { getUsers ,createUser,getUserById} = require("../controllers/user.controller");
const user_route = express.Router();

user_route.get("/", getUsers);
user_route.post("/",createUser);
user_route.get("/:id",getUserById)

module.exports = user_route;
