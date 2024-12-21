import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"], 
      minlength: [3, "Name must be at least 3 characters long"]
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    password: { 
      type: String, 
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters long"]
    },
    role: { 
      type: String, 
      default: "user", 
      enum: {
        values: ["user", "admin"],
        message: "Role must be either 'user' or 'admin'"
      }
    },
    isBlocked: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
