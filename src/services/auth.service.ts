import session from "express-session";
import { SignUpRequestDto } from "../dto/req/user.req.dto";
import { AuthResponseDto } from "../dto/res/user.res.dto";
import User from "../models/user";
import { generateToken } from "../utils/token/generateToken";
import { phoneValidator } from "../validator/phone.validator";
import { verifyOtp } from "./otp.service";

class AuthService {
  signUp = async (user: SignUpRequestDto): Promise<AuthResponseDto> => {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) throw new Error("Email already exist");

    if (!phoneValidator(user.phone)) throw new Error("Invalid phone number");

    const newUser = new User(user);
    await newUser.save();

    return { message: "Sign up successfully", user: newUser };
  };

  signIn = async (
    email: string,
    password: string
  ): Promise<AuthResponseDto> => {
    const user = await User.findByCredentials(email, password);
    if (!user) throw new Error("Invalid email or password");

    if (user.is_active === false)
      throw new Error(
        "Your account is not active. Please check your email to verify your account."
      );

    if (user.is_locked === true)
      throw new Error("Your account is locked. Please contact admin.");

    const token = generateToken(user.email);
    return {
      message: "Sign in successfully",
      access_token: token,
      user: user,
    };
  };

  verifySignUp = async (
    email: string,
    otp: string,
    session: session.Session & Partial<session.SessionData>
  ): Promise<AuthResponseDto> => {
    await verifyOtp(email, otp, session);

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    user.is_active = true;
    await user.save();

    const token = generateToken(user.email);
    return {message: "Sign up successfully", access_token: token, user: user };
  };

  forgotPassword = async(email: string) => {

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");
    return {user: user};
  }

  verifyPassword = async (
    email: string,
    otp: string,
    session: session.Session & Partial<session.SessionData>
  ) => {
    await verifyOtp(email, otp, session);
  };

  resetPassword = async (
    email: string,
    password: string,
  ) => {
    if (!email || !password) throw new Error("Missing email or password");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    user.password = password;
    await user.save();
  };
}

export default new AuthService();
