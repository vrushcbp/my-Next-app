import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();
  try {
    // 1.get user
    const user = await User.findOne({
      email: email,
    });

    //check null user
    if (user == null) {
      throw new Error("user not found !!");
    }

    //match password
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password didnt match");
    }

    //Creating jwt token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_KEY
    );
    

    //create Nextresponse = cookies
    const response = NextResponse.json({
      Message: "Login Success",
      success: true,
      user:user
    });

    response.cookies.set("authToken", token, {
      //response.cookies.set- in built function for NextResponse nextjs, sets the token to cookies
      expiresIn: "1d",
      httpOnly:true
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
