import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (email: string): string => {
  const JWT_KEY = process.env.JWT_KEY as string;
  return jwt.sign({ email: email }, JWT_KEY, {
    expiresIn: "1h",
  });
};
