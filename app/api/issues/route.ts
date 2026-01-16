import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchema";



export async function POST(request: NextRequest){
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    
   
    const prisma = new PrismaClient()
    const newIssues = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssues, {status: 201})

}


