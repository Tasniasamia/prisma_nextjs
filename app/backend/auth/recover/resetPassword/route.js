import { encryptBuffer } from "@/app/backend/helpers/encrypt";
import { verifyToken } from "@/app/backend/helpers/util";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export const POST=async(req,res)=>{
    try{
    const prisma=new PrismaClient();
    let reqbody=await req.json();
    if(reqbody?.token){
        let payload=await verifyToken(reqbody?.token);
        let getUser=await prisma.user.findUnique({where:{email:payload?.email}});
        if(getUser){
            if(reqbody?.password){
                const hashPassword =encryptBuffer(reqbody?.password); 
                reqbody.password = hashPassword;
                await prisma.user.update({where:{email:payload?.email},data:{password:hashPassword}}); 
                return NextResponse.json({success:true,data:getUser,message:"Password Reset Successfully"});
            }
        }
    }
}
catch(e){
    return NextResponse.json({success:false,message:e?.message});
}

}