import { Request, Response } from "express";
import { registerUser, loginUser } from "./auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      statusCode: 400,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: { token },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
      statusCode: 401,
      error: { details: error.message },
      stack: error.stack,
    });
  }
};
