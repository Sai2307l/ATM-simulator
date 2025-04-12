import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import { Transaction } from "@/app/model/User";
import AtmModel from "@/app/model/Atm";
export async function POST(Request: Request) {
  const { amount } = await Request.json();
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
    if (user.balance < amount) {
      return Response.json(
        {
          success: false,
          message: "Insufficient balance",
        },
        {
          status: 400,
        }
      );
    }
    // Deduct amount from the user's balance
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
    if (atm.balance < amount) {
      return Response.json(
        {
          success: false,
          message: "Insufficient ATM balance",
        },
        {
          status: 400,
        }
      );
    }
    user.balance = user.balance - amount;
    user.transactions.push({
      amount: amount,
      date: new Date(),
      type: "deposit",
    } as Transaction);
    user.save();
    atm.balance = atm.balance - amount;
    await atm.save();
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
