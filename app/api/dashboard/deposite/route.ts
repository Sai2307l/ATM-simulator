import dbConnect from "@/app/lib/dbconnect";
import UserModel, { Transaction } from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import AtmModel from "@/app/model/Atm";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function POST(Request: Request) {
  const { amount, password } = await Request.json();
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
    const userId = new mongoose.Types.ObjectId(session.user._id);
    const user = await UserModel.findById(userId);
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect password",
        },
        {
          status: 400,
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
    if (atm.balance < amount || atm.machine_status) {
      return Response.json(
        {
          success: false,
          message: "Insufficient ATM balance or ATM is out of service",
        },
        {
          status: 400,
        }
      );
    }
    atm.balance = Number(atm.balance) + Number(amount);
    await atm.save();
    user.balance = Number(user.balance) + Number(amount);
    user.transactions.push({
      amount: amount,
      date: new Date(),
      type: "deposit",
    } as Transaction);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "User found and balance updated",
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
