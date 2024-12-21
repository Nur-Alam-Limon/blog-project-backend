import { Router } from "express";
import * as blogController from "./blog.controller";
import authMiddleware from "../../middleware/auth.middleware";
import validate from "../../middleware/validate.middleware";
import { createBlogSchema, updateBlogSchema } from "./blog.validation";

const router = Router();

// Create a new blog - Authenticated users only
router.post(
  "/",
  authMiddleware.verifyUser,
  validate(createBlogSchema),
  blogController.create
);

// Get all blogs - Public
router.get("/", blogController.getAll);

// Get a single blog by ID - Public
router.get("/:id", blogController.getById);

// Update a blog by ID - Authenticated users only, with validation
router.put(
  "/:id",
  authMiddleware.verifyUser,
  validate(updateBlogSchema),
  blogController.update
);

// Delete a blog by ID - Authenticated users only
router.delete("/:id", authMiddleware.verifyUser, blogController.deleteBlog);

export default router;