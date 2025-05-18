import { PrismaClient } from "@/app/generated/prisma"
import { NextResponse } from "next/server";

export const GET=async(req,res)=>{
    try{
    const id=req?.nextUrl?.searchParams.get("id");
    if(!id){
        return NextResponse.json({success:false,message:"Id is required"});
    }
    else{
        const prisma=new PrismaClient();
        let getData=await prisma.user.findUnique({
            where:{id:parseInt(id)}
        })
        return NextResponse.json({success:true,data:getData,message:"Data Fetched Successfully"});
    }
   
}
catch(e){
    return NextResponse.json({success:false,message:e?.message});
}
}