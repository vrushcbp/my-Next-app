import { User } from "@/model/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

//getting data of current user
export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;
  const tokenData = jwt.verify(authToken, process.env.JWT_KEY);
  const user = await User.findById(tokenData._id).select("-password");
  return NextResponse.json(user);
}
