import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, verifyCode } = await request.json();
    console.log("Form data received:", username, verifyCode);
    const decodedUser = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUser,
      verifyCode: verifyCode,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code or username",
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
          message: "Invalid verification code",
        },
        {
          status: 400,
        }
      );
    }
    const currentTime = new Date();
    if (user.codeExpiry < currentTime) {
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
    user.verified = true;
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
