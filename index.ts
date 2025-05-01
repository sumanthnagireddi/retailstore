import express, { Request, Response, NextFunction } from "express";
const app = express();
import { connectToDB } from "./src/config/dbConfig";
import { json, urlencoded } from "body-parser";
import cors from "cors";
interface CustomError extends Error {
  statusCode?: number;
}
const PORT = 3000;

// route handlers
const user_router = require("./src/routes/user.route");

// utils
app.use(json());
app.use(urlencoded());
app.use(cors());

// Route mappings
app.use("/api/users", user_router);

// Middleware to handle invalid routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use((err: CustomError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

(async () => {
  try {
    await connectToDB();
    const port = PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error("Error occurred while establishing DB connection", err);
  }
})();
