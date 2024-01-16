import { Works } from "@/model/works";
import { NextResponse } from "next/server";

//get single Work by id
export async function GET(request, { params }) {
  const { worksId } = params;

  try {
    const work = await Works.findById(worksId);
    return NextResponse.json(work);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed to find Work" });
  }
}

//update the works details
export async function PUT(request, { params }) {
  const { worksId } = params;
  const { title, content, status } = await request.json();

  try {
    let work = await Works.findById(worksId);
    (work.title = title), (work.content = content), (work.status = status);
    const updatedWork = await work.save();

    return NextResponse.json(updatedWork);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed to update the workdata" });
  }
}

//Delete the work

export const DELETE = async (request, { params }) => {
  const { worksId } = params;
  console.log('works', worksId)
  try {
    await Works.deleteOne({ _id: worksId });

    return NextResponse.json({
      Message: "task Deleted",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed to delete the workdata" });
  }
};
