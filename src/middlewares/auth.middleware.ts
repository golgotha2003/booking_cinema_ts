import { NextFunction, Request, Response } from "express";
import { Role } from "../utils/user/role.enum";
import User from "../models/user";
import { verifyToken } from "../utils/token/generateToken";

class AuthMiddleware {
  isSignIn = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.session?.access_token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }
    next();
  };
  
  isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.session.access_token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }
  
      const decoded = verifyToken(req.session.access_token);
  
      if (decoded.role !== Role.ADMIN) {
        res.status(403).json({
          success: false,
          message: "Forbidden",
        });
        return;
      }
  
      next(); // ✅ Chỉ gọi nếu tất cả điều kiện đều hợp lệ
    } catch (error) {
      next(error); // ✅ Đảm bảo bắt lỗi và chuyển đến error handler
    }
  };
  

  checkLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      if (req.session.access_token) {
        res.status(400).json({
          success: false,
          message: "You are logged in",
        });
        return; // ✅ Dừng hàm nhưng không trả về Response
      }
  
      next(); // ✅ Chỉ gọi next() khi hợp lệ
    } catch (error) {
      next(error); // ✅ Đẩy lỗi vào middleware xử lý lỗi
    }
  };
}


export default new AuthMiddleware();
