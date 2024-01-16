import { NextResponse } from "next/server";

export function GET(request,{params}){
    const {userId, postId}= params;
    console.log('postID',userId,postId)
    return NextResponse.json({
        message:'postsID this is'
    })
}