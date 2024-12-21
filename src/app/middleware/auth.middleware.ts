import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

// Middleware to verify any user
const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, config.jwt_secret as string); // Decode the JWT
    req.user = decoded as any; // Attach decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyNonAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await verifyUser(req, res, () => {
    if (req.user?.role === "admin") {
      res.status(403).json({ message: "Admins are not allowed to perform this action" });
      return;
    }
    next();
  });
};


// Middleware to verify admin
const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  await verifyUser(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next(); // Continue if the user is an admin
  });
};

export { verifyUser, verifyAdmin, verifyNonAdmin };
