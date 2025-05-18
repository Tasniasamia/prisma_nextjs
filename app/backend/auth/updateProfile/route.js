import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export const PUT=async(req,res)=>{
    try{
    const prisma=new PrismaClient();
    const reqbody=await req.json();
    let udateData=await prisma?.user?.update({where:{id:parseInt(reqbody?.id)},data:{...reqbody}});
    return NextResponse.json({success:true,data:udateData,message:"Data Updated Successfully"});
    }
    catch(e){
        return NextResponse.json({success:false,message:e?.message});
    }
     
}