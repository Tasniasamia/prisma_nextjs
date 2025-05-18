import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { createhasPassword } from "../../helpers/util";

export const POST = async (req) => {
  try {
    const reqbody = await req.json();
    const prisma = new PrismaClient();
    console.log(reqbody?.password);
    if (reqbody?.password) {
        console.log("reqbody?.password", reqbody?.name);
        const hashPassword = await createhasPassword(reqbody.password); 
        reqbody.password = hashPassword;
        console.log("Hashed password", hashPassword);
      }
      
if(reqbody?.name && reqbody?.email && reqbody?.password){
   let getData=await prisma.user.create({
    data:reqbody
   })
   if(getData){
    return NextResponse.json({success:true,data:getData,message:"User Registred Successfully"});
   }
}
else{
    return NextResponse.json({success:false,message:"Data Missing"});
}

 
  } catch (e) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: e?.message,
    });
  }
};
