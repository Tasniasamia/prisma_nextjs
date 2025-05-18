import { sendEmail } from "@/app/backend/helpers/mailgun";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const {searchParams} = new URL(req.url); // ✅ Body থেকে email নিচ্ছি
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized User" });
    }

    // ✅ OTP generate
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Send email
    // await sendEmail({
    //   to: email,
    //   subject: "Your OTP Code",
    //   text: `Your OTP code is ${otp}`,
    //   html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    // });

    // ✅ Update OTP to DB
    await prisma.user.update({
      where: { email },
      data: { otp },
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      otp, 
    });
  } catch (e) {
    console.error("OTP Send Error:", e);
    return NextResponse.json({ success: false, message: e.message });
  }
};
