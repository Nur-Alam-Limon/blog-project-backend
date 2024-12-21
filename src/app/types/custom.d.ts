import { User } from "../app/modules/user/user.model"; 
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: User;  // Define the `user` object here
    }
  }
}
