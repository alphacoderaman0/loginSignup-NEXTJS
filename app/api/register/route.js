import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma= new PrismaClient();
export async function POST(request) {
    const data = await request.json();
    const {name,email,pass} = data
    const hashedPassword = await bcryptjs.hash(pass , 10)
    const newUser = await prisma.user.create({
        data :{
            name,
            email,
            pass:hashedPassword,
        }
    });
    return NextResponse.json({...newUser, name,email,pass});
}

export async function GET(){
    const user = await prisma.user.findMany();
    return NextResponse.json(user)
}
