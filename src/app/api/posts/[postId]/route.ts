import { db } from "@/lib/db";
import { NextResponse } from "next/server";


interface ContextProps {
    params: {
        postId: string
    }
}

export async function DELETE(req: Request, context:ContextProps) {
    try{
        const { params } = context;
        await db.post.delete({
            where: {
                id: params.postId
            }
        });
        return new Response(null, { status: 204})
    }catch(error){
        return NextResponse.json({message: 'Could not delete post'}, {status: 500})
    }
}   

export async function PATCH(req: Request, context:ContextProps) {
    try{
        const { params } = context;
        const body = await req.json();
        await db.post.update({
            where: {
                id: params.postId
            },
            data: {
                title: body.title,
                content: body.content,
                tagId: body.tagId,
            }
        });
        return NextResponse.json({message: 'Update success'}, {status: 200})
    }catch(error){
        return NextResponse.json({message: 'Could not update post'}, {status: 500})
    }
}   