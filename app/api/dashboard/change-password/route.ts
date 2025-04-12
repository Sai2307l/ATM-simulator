import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";

export async function POST(request: Request) {
  const { oldPassword, newPassword } = await request.json();
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    if (!oldPassword || !newPassword) {
      return Response.json(
        {
          success: false,
          message: "Old password and new password are required",
        },
        {
          status: 400,
        }
      );
    }
    const userId = session.user._id;
    const user = await UserModel.findById(userId).select("-balance");
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const isPasswordValid = user.password === oldPassword;
    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid old password",
        },
        {
          status: 400,
        }
      );
    }
    if (oldPassword === newPassword) {
      return Response.json(
        {
          success: false,
          message: "New password cannot be the same as old password",
        },
        {
          status: 400,
        }
      );
    }
    user.new_password = newPassword;
    user.verifyCode_password= Math.floor(100000 + Math.random() * 900000).toString(); // Generate a new verification code
    user.codeExpiry_password = new Date(Date.now() + 10 * 60 * 1000); // Set expiry time to 10 minutes from now
    user.verified_password = false; // Reset verified status
    
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User found",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in get user", error);
    return Response.json(
      {
        success: false,
        message: "Error in get user",
      },
      {
        status: 500,
      }
    );
  }
}
