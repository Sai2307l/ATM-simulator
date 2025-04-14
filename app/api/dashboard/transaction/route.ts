import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
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
    const transactions = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$transactions" },
      { $sort: { "transactions.date": -1 } },
      { $limit: 10 },
      {
        $group: {
          _id: "$_id",
          transactions: { $push: "$transactions" },
        },
      },
    ]);

    if (!transactions || transactions.length === 0) {
      return Response.json(
        {
          success: false,
          message: "No transactions found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Transaction details fetched successfully",
        data: transactions,
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
