import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

class AuthMiddleware {
  async verifyUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return; // Don't continue to the next middleware if token is missing
      }

      const decoded = jwt.verify(token, config.jwt_secret as string); 
      req.user = decoded as any; 
      next(); // Continue to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  async verifyAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
    await this.verifyUser(req, res, () => {
      if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Forbidden" }); // Send response for forbidden access
        return; // Don't continue to the next middleware or route handler if not admin
      }
      next(); // Continue if the user is an admin
    });
  }
}

export default new AuthMiddleware();
