import { Works } from "@/model/works";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { userId } = params;

  try {
    const works = await Works.find({
      userId: userId,
    });
    return NextResponse.json(works);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Message: "unable to fetch tasks" });
  }
};
