import { PrismaClient } from "@/app/generated/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST=async(req,res)=>{
    try{
        let headerlist=await headers();
        console.log("useremail",headerlist.get("user_email"));
        if(headerlist.get("user_email") && headerlist.get("user_id")){
            const prisma=new PrismaClient();
            const reqbody=await req.json();
            let createData=await prisma.product_category.create({data:{...reqbody}});
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