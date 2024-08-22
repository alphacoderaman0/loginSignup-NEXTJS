import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();
export async function DELETE(request,{params}){
    const id = parseInt(params.id);
    const deleteUser = await prisma.user.delete({
        where: { id },
      })
      return NextResponse.json(deleteUser);
}