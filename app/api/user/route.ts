import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

interface User {
  email: string;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const data: User = await request.json();

    const emailFound = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          error: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCreated = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = userCreated;
    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: "An unknown error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          error: "An unknown error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}
