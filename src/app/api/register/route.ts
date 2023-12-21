import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const hashedPassword = await hash(body.password, 10);
    const register = await db.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        orgName: body.orgName,
      },
    });
    NextResponse.json(register, { status: 200 });
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "success" });
}
