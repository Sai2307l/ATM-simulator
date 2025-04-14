import AtmModel from "@/app/model/Atm";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";

export async function PUT(request: Request) {
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
    if (user.role !== "service") {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 403,
        }
      );
    }

    const atm = await AtmModel.findById(1);

    if (!atm) {
      return Response.json(
        {
          success: false,
          message: "ATM not found",
        },
        {
          status: 404,
        }
      );
    }

    atm.machine_status = !atm.machine_status;
    await atm.save();
    return Response.json(
      {
        success: true,
        message: "ATM details updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating ATM details:", error);
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
