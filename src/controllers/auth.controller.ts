import { Request, Response } from "express";
import { SignUpRequestDto } from "../dto/req/user.req.dto";
import authService from "./../services/auth.service";
import { sendEmail } from "../services/email.service";
import { generateOtp } from "../utils/otp/generateOtp";

class AuthController {
  signUp = async (req: Request, res: Response) => {
    try {
      const data = await authService.signUp(req.body as SignUpRequestDto);
      const otp = await generateOtp();

      req.session.otp = {
        email: data.user?.email as string,
        code: otp,
        expiredAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      await sendEmail(data.user?.email as string, otp);

      return res.status(201).json({
        success: true,
        message:
          "Sign up successfully. Please check your email to verify your account.",
        user: data.user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Sign up failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const data = await authService.signIn(email, password);

      req.session.access_token = data.access_token;
      req.session.email = data.user?.email as string;

      return res.status(200).json({
        success: true,
        message: "Sign in successfully",
        user: data.user,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Sign in failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  signOut = async (req: Request, res: Response) => {
    try {
      if (!req.session.email)
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      await new Promise<void>((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      return res.status(200).json({
        success: true,
        message: "Logout successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Logout failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  verifySignUp = async (req: Request, res: Response) => {
    try {
      const { email, otp } = req.body;

      console.log(otp);

      const data = await authService.verifySignUp(email, otp, req.session);

      req.session.access_token = data.access_token;
      req.session.email = data.user?.email;

      return res.status(200).json({
        success: true,
        message: "Verify sign up successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Verify sign up failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const data = await authService.forgotPassword(email);

      const otp = await generateOtp();

      req.session.otp = {
        email: data.user?.email as string,
        code: otp,
        expiredAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      };

      await sendEmail(data.user?.email as string, otp);

      return res.status(200).json({
        success: true,
        message:
          "Forgot password successfully. Please check your email to reset your password.",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Forgot password failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  verifyPassword = async (req: Request, res: Response) => {
    try {
      const { email, otp} = req.body;

      authService.verifyPassword(email, otp, req.session);

      return res.status(200).json({
        success: true,
        message: "Verify password successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Verify password failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      authService.resetPassword(email, password, req.session);

      if (req.session.access_token) {
        await new Promise<void>((resolve, reject) => {
          req.session.destroy((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        return res.status(200).json({
          success: true,
          message: "Reset password successfully, please sign in again",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reset password successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Reset password failed",
        error: error instanceof Error ? error.message : error,
      });
    }
  };
}

export default new AuthController();
