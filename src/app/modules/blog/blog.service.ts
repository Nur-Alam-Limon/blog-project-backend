import Blog from './blog.model';
import { ObjectId } from 'mongodb';

interface CreateBlogData {
  title: string;
  content: string;
  author: ObjectId;
}

interface UpdateBlogData {
  title?: string;
  content?: string;
}


export const createBlog = async (data: CreateBlogData) => {
  try {
    return await Blog.create(data);
  } catch (error: any) {
    throw new Error('Error creating blog: ' + error.message);
  }
};

export const getAllBlogs = async (filters: {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  author?: string;
}) => {
  try {
    const query: any = {};

    // Apply search filter
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } },
      ];
    }

    // Apply author filter
    if (filters.author) {
      query.author = filters.author;
    }

    let blogs = Blog.find(query).populate('author', 'name email');

    // Apply sorting
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      blogs = blogs.sort({ [filters.sortBy]: sortOrder });
    }

    return await blogs;
  } catch (error: any) {
    throw new Error('Error fetching blogs: ' + error.message);
  }
};

export const getBlogById = async (blogId: string) => {
  if (!ObjectId.isValid(blogId)) {
    throw new Error('Invalid blog ID format');
  }

  try {
    const blog = await Blog.findById(blogId).populate('author', 'name email');
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  } catch (error: any) {
    throw new Error('Error fetching blog: ' + error.message);
  }
};

export const updateBlog = async (blogId: string, data: UpdateBlogData) => {
  if (!ObjectId.isValid(blogId)) {
    throw new Error('Invalid blog ID format');
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, data, {
      new: true,
    });
    if (!updatedBlog) {
      throw new Error('Blog not found for update');
    }
    return updatedBlog;
  } catch (error: any) {
    throw new Error('Error updating blog: ' + error.message);
  }
};

export const deleteBlogg = async (blogId: string) => {
  if (!ObjectId.isValid(blogId)) {
    throw new Error('Invalid blog ID format');
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      throw new Error('Blog not found for deletion');
    }
    return deletedBlog;
  } catch (error: any) {
    throw new Error('Error deleting blog: ' + error.message);
  }
};
