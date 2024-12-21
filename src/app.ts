// Import required dependencies
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// Import routes for authentication, user, blog, etc.
import authRoutes from './app/modules/auth/auth.routes';
import userRoutes from './app/modules/user/user.routes';
import blogRoutes from './app/modules/blog/blog.routes';

// Create app using express
const app: Application = express();

// Middleware for parsing incoming JSON requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Root endpoint with description and available API endpoints
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Blog Project API!',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      blogs: '/api/blogs',
    },
  });
});

// API routes
app.use('/api/auth', authRoutes);  // Auth routes (login, register)
app.use('/api/users', userRoutes); // User routes (create, update, delete)
app.use('/api/blogs', blogRoutes); // Blog routes (CRUD operations)

export default app;
