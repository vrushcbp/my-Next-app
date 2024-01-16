import { connectDb } from "@/helper/db";
import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
connectDb();
export async function GET(request) {
  let users = [];

  try {
    users = await User.find();
  } catch (error) {
    return NextResponse.json({
      Message: "failed to get user",
      status: false,
    });
  }
  return NextResponse.json(users);
}
export function PUT() {}
export function DELETE() {}

//Createing a new user
export async function POST(request) {
  const { name, email, password, about, profileURL } = await request.json();
  console.log({ name, email, password, about, profileURL });
  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });
  try {
    user.password =  await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT));
    const createdUser = await user.save();
    const response = NextResponse.json(user, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Failed to create user",
      status: false,
    });
  }
}
