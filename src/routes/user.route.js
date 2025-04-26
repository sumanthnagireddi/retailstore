const express = require("express");
const { getUsers } = require("../controllers/user.controller");
const user_route=express.Router();


user_route.route("/").get(getUsers)

module.exports=user_route