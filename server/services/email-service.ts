import sgMail from '@sendgrid/mail';
import { User } from '@shared/schema';
import crypto from 'crypto';

// Initialize SendGrid with API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sender address - replace with your verified sender
const SENDER_EMAIL = 'noreply@gosafrat.com';

// Token generation and validation
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Email templates
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Send email using SendGrid
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const msg = {
      to: options.to,
      from: SENDER_EMAIL,
      subject: options.subject,
      html: options.html,
    };
    
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Email verification email
export async function sendVerificationEmail(user: User, token: string, baseUrl: string): Promise<boolean> {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  const emailOptions: EmailOptions = {
    to: user.email,
    subject: 'Verify Your GoSafrat Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">GoSafrat</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
          <h2>Confirm Your Email Address</h2>
          <p>Hello ${user.firstName || user.username},</p>
          <p>Thank you for registering with GoSafrat. Please verify your email address to complete your registration.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${verificationUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email Address</a>
          </div>
          <p>If you did not request this verification, please ignore this email.</p>
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>Thank you,<br>The GoSafrat Team</p>
        </div>
        <div style="text-align: center; padding: 10px; color: #666; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} GoSafrat. All rights reserved.</p>
        </div>
      </div>
    `,
  };
  
  return await sendEmail(emailOptions);
}

// Password reset email
export async function sendPasswordResetEmail(user: User, token: string, baseUrl: string): Promise<boolean> {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;
  
  const emailOptions: EmailOptions = {
    to: user.email,
    subject: 'Reset Your GoSafrat Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">GoSafrat</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none;">
          <h2>Reset Your Password</h2>
          <p>Hello ${user.firstName || user.username},</p>
          <p>We received a request to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
          </div>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>Thank you,<br>The GoSafrat Team</p>
        </div>
        <div style="text-align: center; padding: 10px; color: #666; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} GoSafrat. All rights reserved.</p>
        </div>
      </div>
    `,
  };
  
  return await sendEmail(emailOptions);
}