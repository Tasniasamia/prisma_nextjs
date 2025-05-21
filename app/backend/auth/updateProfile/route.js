import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

export const PUT=async(req,res)=>{
    try{
    const prisma=new PrismaClient();
    const reqbody=await req.json();
    const {id,...othersData}=reqbody;
    let newUpdateData={
        name:othersData?.name,
        phone_no: othersData?.phone_no,
        country: othersData?.country,
        pre_address: othersData?.pre_address,
        per_address:othersData?.per_address
    }
    let udateData=await prisma?.user?.update({where:{id:parseInt(id)},data:newUpdateData});
    return NextResponse.json({success:true,data:udateData,message:"Data Updated Successfully"});
    }
    catch(e){
        return NextResponse.json({success:false,message:e?.message});
    }
     
}