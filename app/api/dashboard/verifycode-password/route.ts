//TODO: Add types for request and response and change the function to async function POST(request: Request, response: Response)

import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, verifyCode } = await request.json();
    const decodedUser = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUser,
      verified: true,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code for password reset",
        },
        {
          status: 400,
        }
      );
    }
    const isCodeValid = user.verifyCode === verifyCode;
    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code for password reset",
        },
        {
          status: 400,
        }
      );
    }
    const currentTime = new Date();

    if (user.codeExpiry_password < currentTime) {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired",
        },
        {
          status: 400,
        }
      );
    }

    user.password = user.new_password;
    user.new_password = "0000";
    user.verifyCode = "0000";
    user.verified_password = true;
    user.codeExpiry_password = new Date(0);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User verified successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in verify code", error);
    return Response.json(
      {
        success: false,
        message: "Error in verify code",
      },
      {
        status: 500,
      }
    );
  }
}
