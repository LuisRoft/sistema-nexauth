import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const id = parseInt(params.id);

    const user = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted", user });
  } catch (error: unknown) {
    console.error("Delete error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
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
