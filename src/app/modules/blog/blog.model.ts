import mongoose from "mongoose";

// Define the blog schema with validations
const blogSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"], 
      minlength: [3, "Title must be at least 3 characters long"]
    },
    content: { 
      type: String, 
      required: [true, "Content is required"], 
      minlength: [10, "Content must be at least 10 characters long"]
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Author is required"],
      validate: {
        validator: function(value: mongoose.Types.ObjectId) {
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: "Author must be a valid ObjectId"
      }
    },
  },
  { timestamps: true }
);

// Export the Mongoose model
export default mongoose.model("Blog", blogSchema);