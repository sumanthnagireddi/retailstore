import { Request } from "express";

export interface CustomError extends Error {
    statusCode?: number;
  }
 
  export interface REQUEST extends Request {
    cookies: { [key: string]: string };
  }
  