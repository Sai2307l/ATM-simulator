import AtmModel from "@/app/model/Atm";
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
    const user = session.user;
    const usedId = new mongoose.Types.ObjectId(user._id);
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

    try {
      const user = await UserModel.aggregate([
        { $match: { _id: usedId } },
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
    } catch (error) {
      console.log(error);
    }
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
  return Response.json(
    {
      success: true,
      message: "ATM details fetched successfully",
    },
    {
      status: 200,
    }
  );
}
