import { NextResponse } from "next/server";
import { PrismaClient } from "../generated/prisma";



export const POST = async (req,res) => {
    try {
        const prisma = new PrismaClient();
        const getData = await req.json();
        console.log("getData", getData);

        let createData = await prisma.user.create({
            data: {
                ...getData
            }
        });

        return NextResponse.json({ success: true, data: createData });
    } catch (e) {
        return NextResponse.json({ success: false, message: e.message });
    }
}

export const GET = async () => {
    try {
        const prisma = new PrismaClient();

        // let findData = await prisma.user.findMany({
        //     select: {
        //         id: true,
        //         email: true
        //     }
        // });
        let findData = await prisma.user.groupBy({
            by: ['name'],
            _count: {
                name: true
            }
        });
        return NextResponse.json({ success: true, data: findData ,message:"Data Fetched Successfully"});
    } catch (e) {
        return NextResponse.json({ success: false, message: e.message });
    }
}
