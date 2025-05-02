import express, { Request, Response, NextFunction } from "express";
const app = express();
import { connectToDB } from "./src/config/dbConfig";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser  from "cookie-parser"
dotenv.config()
interface CustomError extends Error {
  statusCode?: number;
}

// route handlers
import auth_router from "./src/routes/auth.route";
import user_route from "./src/routes/user.route";
// utils
app.use(json());
app.use(urlencoded());
app.use(cors());
app.use(cookieParser())

// Route mappings
app.use("/api/users", user_route);
app.use("/api/user",auth_router)


// Middleware to handle invalid routes (404)
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Global Error Handler
app.use((err: CustomError, req: Request, res: Response) => {
  console.log(err)
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

(async () => {
  try {
    await connectToDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on PORT ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Error occurred while establishing DB connection", err);
  }
})();
