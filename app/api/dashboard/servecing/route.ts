import AtmModel from "@/app/model/Atm";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { id, balance, date_of_Servicing, machine_status, location } =
      await request.json();
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

    const atm = new AtmModel({
      id,
      balance,
      date_of_Servicing,
      lastServiced: new Date(),
      machine_status,
      location,
    });

    await atm.save();

    return Response.json(
      {
        success: true,
        message: "ATM details added successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error adding ATM details:", error);
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

export async function GET(request: Request) {
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

    const atmDetails = await AtmModel.find({}).sort({ date_of_Servicing: -1 });
    return Response.json(
      {
        success: true,
        message: "ATM details fetched successfully",
        data: atmDetails,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching ATM details:", error);
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

export async function PUT(request: Request) {
  await dbConnect();
  try {
    const { id, balance, machine_status } = await request.json();
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

    const atm = await AtmModel.findById(id);

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
    atm.balance = balance;
    atm.machine_status = machine_status;
    atm.lastServiced = new Date();
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
