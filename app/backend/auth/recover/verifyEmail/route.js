import { sendEmail } from "@/app/backend/helpers/mailgun";
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req) => {
  try {
    const { email, action } = await req.json();

    if (!email || !action) {
      return NextResponse.json({ success: false, message: "Email and action are required" });
    }

    const now = new Date();
    const normalizedEmail = email.toLowerCase();

    // ✅ Check user existence based on action
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (action === "signup") {
      if (existingUser) {
        return NextResponse.json({ success: false, message: "User already exists" });
      }
    } else if (action === "resetPassword") {
      if (!existingUser) {
        return NextResponse.json({ success: false, message: "Unauthorized user" });
      }
    } else {
      return NextResponse.json({ success: false, message: "Invalid action" });
    }

    // ✅ Check last OTP for this email & action
    const lastOtp = await prisma.otp.findFirst({
      where: {
        email: normalizedEmail,
        action,
      },
      orderBy: { otpSentAt: "desc" },
    });

    if (lastOtp) {
      const otpSession = (now.getTime() - lastOtp.otpSentAt.getTime()) / 1000;
      if (otpSession < 120) {
        return NextResponse.json({
          success: false,
          message: "OTP sent too frequently. Try again later.",
        });
      }
    }

    // ✅ Clean up old OTPs for this action
    await prisma.otp.deleteMany({
      where: {
        email: normalizedEmail,
        action,
      },
    });

    // ✅ Create new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.otp.create({
      data: {
        email: normalizedEmail,
        action,
        otp,
        otpSentAt: now,
      },
    });

    // ✅ Send Email (uncomment in prod)
    // await sendEmail({
    //   to: normalizedEmail,
    //   subject: "Your OTP Code",
    //   text: `Your OTP code is ${otp}`,
    //   html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    // });

    return NextResponse.json({
      success: true,
      message: "OTP sent to your email",
      otp, // Dev only
    });

  } catch (e) {
    console.error("OTP Send Error:", e);
    return NextResponse.json({ success: false, message: e.message });
  }
};
