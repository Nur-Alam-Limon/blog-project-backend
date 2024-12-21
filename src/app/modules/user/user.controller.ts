import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  // Get all users
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a user by ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return; // End the function if the user is not found
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a user by ID
  async update(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Block a user
  async block(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.blockUser(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Unblock a user
  async unblock(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.unblockUser(req.params.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
