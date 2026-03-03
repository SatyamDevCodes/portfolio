import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, otp) => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: 'Admin Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Admin Login OTP</h2>
          <p style="color: #555; text-align: center;">Use the OTP below to login:</p>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #222; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #999; font-size: 12px; text-align: center;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        </div>
      `,
    });

    console.log('Email sent successfully: ', data.id);
    return data;
  } catch (error) {
    console.error('Email sending failed: ', error);
    throw error;
  }
};
