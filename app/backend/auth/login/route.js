import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { createToken, verifyToken} from "../../helpers/util";
import { decryptBuffer } from "../../helpers/encrypt";
export const POST = async (req, res) => {
  try {
    const reqbody = await req.json();
    const prisma = new PrismaClient();
    let getUser = await prisma.user.findUnique({
      where: { email: reqbody?.email },
    });
    // console.log("finduser",getUser);
   const isMatch=(decryptBuffer(getUser?.password))===reqbody?.password;

    if (isMatch) {
      let token =await createToken({ email: getUser?.email, id: getUser?.id });
      let verifytoken=await verifyToken(token);
      console.log("verifytoken",verifytoken);
      return NextResponse.json({
        success: true,
        token: token,
        message: "Login Successfully",
      });
    } else {
      return NextResponse.json({ success: false, message: "Unauthrized User" });
    }
  } catch (e) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: e?.message,
    });
  }
};
