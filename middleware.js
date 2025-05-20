import { NextResponse } from "next/server";
import { verifyToken } from "./app/backend/helpers/util";

export const middleware=async(req,res,next)=>{
    console.log("coming here 1");
    try{

   const authHeader=req.headers.get('authorization');
   console.log("authHeader",authHeader);
   if(authHeader){
    const token=authHeader.split(' ')[1];
    let payload=await verifyToken(token);
    req.headers.set("user_id",payload?.id);
    req.headers.set("user_email",payload?.email);
    const requestHeader=new Headers(req.headers);
    return NextResponse.next({request:{headers:requestHeader}});
   }}
   catch(e){
    console.log("coming here catch");

    req.headers.set("user_id","");
    req.headers.set("user_email","");
    const requestHeader=new Headers(req.headers);
    return NextResponse.next({request:{headers:requestHeader}});
   }
   
}