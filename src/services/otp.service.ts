import session from "express-session";

export const verifyOtp = async (email: string, otp: string, session: session.Session & Partial<session.SessionData>): Promise<boolean> => {
    if (!email || !otp) throw new Error("Missing email or otp");

    if(!session.otp) throw new Error("OTP not found");

    if (Date.now() > session.otp.expiredAt) {
        delete session.otp;
        throw new Error("OTP expired");
    }

    if (session.otp.code !== otp) throw new Error("Invalid OTP");

    delete session.otp;

    return true;
}