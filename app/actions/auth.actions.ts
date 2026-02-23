"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@/lib/generated/prisma/client";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function signup(input: SignupInput) {
  const { name, email, password } = input;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    // Check if this is the first user
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create account");
  }
}

export async function login(input: LoginInput) {
  const { email, password } = input;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      throw error;
    }
    console.error(error);
    throw new Error("Failed to login");
  }
}
