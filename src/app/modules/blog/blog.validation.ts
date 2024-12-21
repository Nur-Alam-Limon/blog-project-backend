
import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  author: z.string().regex(/^[a-fA-F0-9]{24}$/), 
});

export const updateBlogSchema = createBlogSchema.partial(); // Optional for updates
