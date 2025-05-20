import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import {  encryptBuffer } from "../../helpers/encrypt";

export const POST = async (req) => {
  try {
    const reqbody = await req.json();
    const prisma = new PrismaClient();
    console.log(reqbody?.password);
    if (reqbody?.password) {
        const hashPassword =encryptBuffer(reqbody?.password); 
        reqbody.password = hashPassword;
        console.log("Hashed password", hashPassword);
      }
      
if(reqbody?.name && reqbody?.email && reqbody?.password && reqbody?.otp){
   let getData=await prisma.user.create({
    data:{...reqbody}
   })
   if(getData){
    return NextResponse.json({success:true,data:getData,message:"User Registred Successfully"});
   }
}
else{
    return NextResponse.json({success:false,message:"All fields are required"});
}

 
  } catch (e) {
    console.log("coming here 2");
    return NextResponse.json({
      status: 500,
      success: false,
      message: e?.message,
    });
  }
};
