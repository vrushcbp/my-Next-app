import { connectDb } from "@/helper/db";
import { Works } from "@/model/works";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connectDb();
export async function GET(request) {
  let works = [];
  try {
    works = await Works.find();
    return NextResponse.json(works);
  } catch (error) {
    return NextResponse.json({ message: "Failed to get works" });
  }
}

export async function POST(request) {
  const { title, content, userId, status } = await request.json();

  //fetching loggedin userID
  const authToken = request.cookies.get("authToken")?.value;
  const tokenData = jwt.verify(authToken, process.env.JWT_KEY);

  const works = new Works({
    title,
    content,
    userId: tokenData._id,
    status,
  });
  try {
    const createdWork = await works.save();
    return NextResponse.json(createdWork,{status:201});
    
  } catch (error) {
    return NextResponse.json({
      message: "failed to create works",
      success: false,
    });
  }
}
