import Blog from "./blog.model";
import { ObjectId } from "mongodb"; 

interface CreateBlogData {
  title: string;
  content: string;
  author: ObjectId; 
}

interface UpdateBlogData {
  title?: string;
  content?: string;
}

class BlogService {
  // Create a new blog
  async create(data: CreateBlogData) {
    try {
      const blog = await Blog.create(data);
      return blog;
    } catch (error: any) {
      throw new Error("Error creating blog: " + error.message);
    }
  }

  // Get all blogs
  async getAll() {
    try {
      const blogs = await Blog.find().populate("author", "name email");
      return blogs;
    } catch (error: any) {
      throw new Error("Error fetching blogs: " + error.message);
    }
  }

  // Get a single blog by ID
  async getById(blogId: string) {
    if (!ObjectId.isValid(blogId)) {
      throw new Error("Invalid blog ID format");
    }

    try {
      const blog = await Blog.findById(blogId).populate("author", "name email");
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error: any) {
      throw new Error("Error fetching blog: " + error.message);
    }
  }

  // Update a blog by ID
  async update(blogId: string, data: UpdateBlogData) {
    if (!ObjectId.isValid(blogId)) {
      throw new Error("Invalid blog ID format");
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, data, { new: true });
      if (!updatedBlog) {
        throw new Error("Blog not found for update");
      }
      return updatedBlog;
    } catch (error: any) {
      throw new Error("Error updating blog: " + error.message);
    }
  }

  // Delete a blog by ID
  async delete(blogId: string) {
    if (!ObjectId.isValid(blogId)) {
      throw new Error("Invalid blog ID format");
    }

    try {
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      if (!deletedBlog) {
        throw new Error("Blog not found for deletion");
      }
      return deletedBlog;
    } catch (error: any) {
      throw new Error("Error deleting blog: " + error.message);
    }
  }
}

export default new BlogService();
