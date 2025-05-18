import { createToken } from "@/app/backend/helpers/util";
import { NextResponse } from "next/server";

export const POST=async(req,res)=>{
    let reqbody=await req.json();
    if(reqbody?.otp){
        // if(reqbody?.action==="signup"){
            
        // }
        if(reqbody?.action==="resetPassword"){
            let token=await createToken({email:reqbody?.email,id:reqbody?.id});
            return NextResponse.json({success:true,token,message:"OTP Matched"});

        }
        
    }
    else{
        return NextResponse.json({success:false,message:"OTP Not Matched"});
    }

}