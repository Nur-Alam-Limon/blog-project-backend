import { Request, Response } from "express";
import blogService from "./blog.service";
import { ObjectId } from "mongodb"; // Import ObjectId to validate the ID

// Create a new blog
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData = { ...req.body, author: req.user.id }; 
    const blog = await blogService.create(blogData);
    res.status(201).json(blog);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blogs
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await blogService.getAll();
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid blog ID" });
      return; 
    }

    const blog = await blogService.getById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return; 
    }
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog by ID
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid blog ID" });
      return; // Stop further execution
    }

    const blog = await blogService.update(id, req.body);
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog by ID
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid blog ID" });
      return; // Stop further execution
    }

    await blogService.delete(id);
    res.status(204).end(); 
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
