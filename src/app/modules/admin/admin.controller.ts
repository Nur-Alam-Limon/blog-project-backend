import { Request, Response } from "express";
import { blockUser } from "./admin.service";
import { deleteBlogg } from "../blog/blog.service";
import { ObjectId } from "mongodb";

// Block a user
const block = async (req: Request, res: Response): Promise<void> => {
  try {
    await blockUser(req.params.id); // Call service to block the user
    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid blog ID",
        statusCode: 400,
      });
      return;
    }

    await deleteBlogg(id); // Call service to delete the blog
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the blog",
      statusCode: 500,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

export { block, deleteBlog };
