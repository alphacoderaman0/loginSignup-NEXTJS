import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();

export async function POST(req) {
    const jwtkey = 'login'
    try {
        const {email , pass} = await req.json();
        const isExistEmail = await prisma.user.findFirst({
            where:{
                email:email
            }
        });
        console.log(isExistEmail.name);
        
        const correctPass = isExistEmail.pass;
        const comparepass = await bcryptjs.compare(pass ,correctPass);
        if(comparepass){
            jwt.sign({isExistEmail} , jwtkey , {expiresIn:'2h'} , (error , token) =>{
                if(error){
                    return NextResponse.json({message:"some error occured"},{status:500})
                }
                 return NextResponse.json({message:"successfully login " , isExistEmail , token:token},{status:200});
            })
        }else{
            return NextResponse.json({message:"invalid detail"},{status:500})
        }
        return NextResponse.json({message:"login"} , {status:200})
    } catch (error) {
        return NextResponse.json({message:'error occur'} , {status:500})
    }
}

