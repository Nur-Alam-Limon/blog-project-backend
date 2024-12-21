import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = schema.parse(req.body); // Parse and validate the request body
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Return the validation errors
      res.status(400).json({ message: "Validation failed", errors: error.issues });
    } else {
      // If the error is not a ZodError, pass it to the next middleware or error handler
      next(error);
    }
  }
};

export default validate;
