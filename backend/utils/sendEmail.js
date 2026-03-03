import nodemailer from "nodemailer";

export const sendEmail = async (to, otp)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Admin Login OTP",
        html:`<h2>Your OTP is: ${otp}</h2>`,
    });
};