import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  const adminEmail = "admin@plussign.ng";
  const adminPassword = "AdminPassword123!";

  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists." });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.create({
      data: {
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    return NextResponse.json({
      message: "Admin user created successfully.",
      email: adminEmail,
      password: adminPassword,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
