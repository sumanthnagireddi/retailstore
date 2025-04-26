const User = require("../models/User.model");

 const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {}
};

module.exports = {getUsers}