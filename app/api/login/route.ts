import { NextRequest, NextResponse } from "next/server";
import { zLogin } from "../type";
import { prisma } from "@/global/db";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parsedData = zLogin.parse(data);
  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.email,
    }
  });
  if ( user === null) {
    return new NextResponse("user not found", { status: 401 })
  } else {
    const comparePassword = async () => {
      const isMatch = await compare(parsedData.password, user.password)
      if(!isMatch) {
        return new NextResponse("invalid password", { status: 401 })
      }
      return NextResponse.json({id: user.id, name: user.name, email: user.email})
    }
    return await comparePassword();
  }
}