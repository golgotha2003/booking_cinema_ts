import { Request, Response } from "express";
import userService from "../services/user.service";
import { CurrentResponseDto } from "../dto/res/user.res.dto";

class UserController {
  getCurrent = async (req: Request, res: Response) => {
    const email = req.session.email as string;

    const user = await userService.getCurrent(email);

    return res.status(200).json({
      success: true,
      message: "Get current user successfully",
      user: user,
    });
  };

  updateCurrent = async (req: Request, res: Response) => {
    const user = req.body as CurrentResponseDto;

    await userService.updateCurrent(user);

    return res.status(200).json({
      success: true,
      message: "Update current user successfully",
      user: user,
    });
  };

  changePassword = async (req: Request, res: Response) => {
    const email = req.session.email as string;
    const oldPassword = req.body.oldPassword as string;
    const newPassword = req.body.newPassword as string;

    await userService.changePassword(email, oldPassword, newPassword);

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
      message: "Change password successfully",
    });
  };
}

export default new UserController();
