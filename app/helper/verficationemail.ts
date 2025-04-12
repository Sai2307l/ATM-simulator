import resend from "../lib/resend";
import { ApiResponse } from "../types/ApiResponse";
import Password_VerificationEmail from "../email/password_verifyemail";

export default async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification Mail From ATM",
      react: Password_VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error) {
    console.log("Error sending verification email", error);
    return {
      success: false,
      message: "Error sending verification email",
    };
  }
}
