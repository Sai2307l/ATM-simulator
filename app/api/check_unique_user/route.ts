import dbConnect from "@/app/lib/dbconnect";
import UserModel from "@/app/model/User";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const searchParams = new URL(request.url).searchParams;
    const queryParam = {
      username: searchParams.get("username"),
    };
    const { username } = queryParam;
    const existingUser = await UserModel.findOne({
      username: username,
      isVerified: true,
    });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in check unique user", error);
    return Response.json(
      {
        success: false,
        message: "Error in check unique user",
      },
      {
        status: 500,
      }
    );
  }
}
