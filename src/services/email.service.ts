import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (email: string, otp: string) => {
    try {
        const mailOptions = {
            from: "BOOKING CINEMA",
            to: email,
            subject: "Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #333;">OTP Confirmation</h2>
                    <p>Your OTP code is:</p>
                    <h3 style="background-color: #f4f4f4; padding: 10px; display: inline-block;">${otp}</h3>
                    <p>The OTP code is valid for 5 minutes.</p>
                    <p>If you did not request this code, please ignore this email.</p>
                </div>
            `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return true;
    } catch (error) {
        throw new Error(error as string);
    }
};