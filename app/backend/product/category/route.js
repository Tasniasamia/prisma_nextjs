import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export const POST=async(req,res)=>{
    try{
        if(req.headers.get("user_email") && req.headers.get("user_id")){
            const prisma=new PrismaClient();
            const reqbody=await req.json();
            let createData=await prisma.category.create({data:{...reqbody}});
            return NextResponse.json({success:true,data:createData,message:"Data Created Successfully"});
        }
        else{
            return NextResponse.json({success:false,message:"Unauthorized User"});
        }
        
    }
    catch(e){
        return NextResponse.json({success:false,message:e?.message});
    }
}