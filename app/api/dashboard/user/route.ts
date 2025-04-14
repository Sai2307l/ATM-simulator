import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);
    if (!session || !session.user) {
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
    const userId = new mongoose.Types.ObjectId(session.user._id);
    console.log("User ID:", userId);
    if (!userId) {
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
    const user = await UserModel.findById(userId);
    console.log("User:", user);
    return Response.json(
      {
        success: true,
        message: "User details fetched successfully",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
