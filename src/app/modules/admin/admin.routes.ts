import { Router } from "express";
import { verifyAdmin } from "../../middleware/auth.middleware";
import { block, deleteBlog } from "./admin.controller";

const router = Router();

// Block a user - Admin only
router.patch("/users/:id/block", verifyAdmin, block);

// Delete a blog by ID - Authenticated users only
router.delete("/blogs/:id", verifyAdmin, deleteBlog);

export default router;
