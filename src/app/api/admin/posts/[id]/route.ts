import { NextRequest, NextResponse } from "next/server";
import { updatePostStatus } from "@/data/queries";
import { UpdatePostApiContext } from "@/types/props";


export async function PUT(request: NextRequest,  { params }: UpdatePostApiContext) {
    const { id } = params;
    const { published } = await request.json();

    await updatePostStatus(id, { published: published })
    return NextResponse.json({
        message: `Post Mar as ${published === true ? "Published": "Saved as Parameter"}` },
        { status: 200 }
    );
  }