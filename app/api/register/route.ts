import { NextRequest, NextResponse } from "next/server";
import { zUser } from "../type";
import bcryptjs from "bcryptjs";
import { prisma } from "@/global/db";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = zUser.parse(data);
  const hashedPassword = bcryptjs.hashSync(parsedData.password, 8)
  try {
    const user = await prisma.user.create({
      data: {
        email: parsedData.email,
        name: parsedData.name,
        password: hashedPassword,
      }
    })
    return new NextResponse(`{id: ${user.id}, name: ${user.name}}`, { status: 201})
  } catch (error) {
    return new NextResponse(`error: `, {status: 500});
  }
}