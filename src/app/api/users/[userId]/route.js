import { User } from "@/model/user";
import { NextResponse } from "next/server";

//fetching single user

export async function GET(request, { params }) {
  const { userId } = params;
  const user = await User.findById(userId).select("-password");
  return NextResponse.json(user);
}

//deleting single user
export async function DELETE(request, { params }) {
  const { userId } = params;
  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json({ message: "deleted" });
  } catch (error) {
    return NextResponse.json({ message: "failed to delete" });
  }
}

//updating the user
export async function PUT(request, { params }) {
  const { userId } = params;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user= await User.findById(userId).select('-password')
    user.name=name;
    user.password=password;
    user.about=about;
    user.profileURL=profileURL;

    const updatedUser=await user.save()
    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({
      message:'Failed to update user.',
      success:false
    })
  }
}
