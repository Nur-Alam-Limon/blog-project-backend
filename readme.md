# Blog API Project

### Live Link  
[https://blog-project-pied-eight.vercel.app/](https://blog-project-pied-eight.vercel.app/)

### Admin Info  
- **Email**: admin@example.com  
- **Password**: admin123  

---

## Overview
This project is a backend implementation for a blogging platform. Users can create, read, update, and delete blogs, while an admin has elevated privileges to manage users and their blogs. The backend ensures secure authentication, role-based access control, and public access to blogs with search, sort, and filter functionalities.

## Technologies Used
- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Features
### User Roles
- **Admin**:
  - Can delete any blog.
  - Can block users by updating the `isBlocked` property.
  - Cannot update any blog.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**: Users must log in to perform write, update, and delete operations.
- **Authorization**: Role-based access control ensures separation of permissions for Admin and User roles.

### Blog API
- Publicly available endpoints for viewing blogs.
- Features include search, sorting, and filtering.

## API Endpoints

### Authentication

#### Register
- **URL**: `/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login
- **URL**: `/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Blog Management

#### Create Blog
- **URL**: `/blogs`
- **Method**: POST
- **Headers**:
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```

#### Update Blog
- **URL**: `/blogs/:id`
- **Method**: PATCH
- **Headers**:
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```

#### Delete Blog
- **URL**: `/blogs/:id`
- **Method**: DELETE
- **Headers**:
  - `Authorization: Bearer <token>`

#### Get All Blogs (Public)
- **URL**: `/blogs`
- **Method**: GET
- **Query Parameters**:
  - `search`: Search blogs by title or content.
  - `sortBy`: Sort blogs by specific fields (e.g., `createdAt`, `title`).
  - `sortOrder`: `asc` or `desc` for ascending or descending order.
  - `filter`: Filter blogs by author ID.
- **Example**:
  `/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId`

### Admin Actions

#### Block User
- **URL**: `/admin/users/:userId/block`
- **Method**: PATCH
- **Headers**:
  - `Authorization: Bearer <admin_token>`

#### Delete Blog
- **URL**: `/admin/blogs/:id`
- **Method**: DELETE
- **Headers**:
  - `Authorization: Bearer <admin_token>`


## Error Handling
- Common errors handled:
  - Validation errors
  - Authentication/Authorization errors
  - Resource not found
  - Internal server errors

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up a `.env` file with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=<MongoDB connection string>
   JWT_SECRET=<Your JWT secret>
   ```
4. Start the server:
   ```bash
   npm run start:dev
   ```

## Notes
- Admin users must be created manually in the database.
