import { PrismaClient } from "@/app/generated/prisma"
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET=async(req,res)=>{
    try{
        let headerlist=await headers();
        if(headerlist.get("user_email") && headerlist.get("user_id")){
            const prisma=new PrismaClient();
            let getData=await prisma.user.findUnique({
                where:{id:parseInt(headerlist.get("user_id"))}
            })
            return NextResponse.json({success:true,data:getData,message:"Data Fetched Successfully"});


    }
    else{
        return NextResponse.json({success:false,message:"Unauthorized User"});

    }
   
}
catch(e){
    return NextResponse.json({success:false,message:e?.message});
}
}