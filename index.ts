import express from "express";
const app = express();
import { connectToDB } from "./src/config/dbConfig";
import { json, urlencoded } from "body-parser";
import cors from "cors";

const PORT = 3000;

const user_router = require("./src/routes/user.route");

connectToDB();

app.use(json());
app.use(urlencoded());
app.use(cors());
app.use("/api/users", user_router);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
