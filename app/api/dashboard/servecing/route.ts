import AtmModel from "@/app/model/Atm";
import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import mongoose from "mongoose";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { Id, balance, status, location } = await request.json();
    console.log("Received data:", { balance, status, location });
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
      _id: Id,
      balance,
      date_of_Servicing: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      lastServiced: Date.now(),
      machine_status: status,
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

export async function PUT() {
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
    if (atm.machine_status === true) {
      return Response.json(
        {
          success: false,
          message: "Servicing only possible during OFF status",
        },
        {
          status: 400,
        }
      );
    }
    atm.balance = 100000;
    atm.machine_status = true;
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

export async function PATCH() {
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

    const atm = await AtmModel.findById("1");

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

    atm.balance = 100000;
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
