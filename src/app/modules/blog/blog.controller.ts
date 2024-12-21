import { Request, Response } from "express";
import { createBlog, deleteBlogg, getAllBlogs, getBlogById, updateBlog } from "./blog.service";
import { ObjectId } from "mongodb"; 

// Create a new blog
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData = { ...req.body, author: req.user.id }; 
    const blog = await createBlog(blogData);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: blog,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Blog creation failed",
      statusCode: 400,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

// Get all blogs
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await getAllBlogs(req.query);

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: blogs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      statusCode: 500,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

// Get a single blog by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
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

    const blog = await getBlogById(id);
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Blog not found",
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      statusCode: 200,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch the blog",
      statusCode: 500,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

// Update a blog by ID
export const update = async (req: Request, res: Response): Promise<void> => {
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

    const updatedBlog = await updateBlog(id, req.body);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: updatedBlog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update the blog",
      statusCode: 500,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
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

    await deleteBlogg(id);
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
