import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";


export async function GET() {
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
    const userId = session.user._id;
    const user = await UserModel.findById(userId).select("-balance");
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
