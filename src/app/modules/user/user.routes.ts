import { Router } from "express";
import userController from "./user.controller";
import authMiddleware from "../../middleware/auth.middleware";
import validate from "../../middleware/validate.middleware";
import { updateUserSchema } from "./user.validation";

const router = Router();

// Get all users - Admin only
router.get("/", authMiddleware.verifyAdmin, userController.getAll);

// Get user by ID - Admin only
router.get("/:id", authMiddleware.verifyAdmin, userController.getById);

// Update user details - Admin only, with validation
router.put("/:id", authMiddleware.verifyAdmin, validate(updateUserSchema), userController.update);

// Block a user - Admin only
router.patch("/:id/block", authMiddleware.verifyAdmin, userController.block);

// Unblock a user - Admin only
router.patch("/:id/unblock", authMiddleware.verifyAdmin, userController.unblock);

export default router;
