import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const syncBodySchema = z.object({
  clerkId: z.string(),
  email: z.email(),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { clerkId } = syncBodySchema.parse(body);

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      include: { workspace: true },
    });

    if (user && user.workspace) {
      return NextResponse.json(
        {
          error: "User already exists and is associated with a workspace",
          user: { id: user.id, workspaceId: user.workspace.id },
        },
        { status: 409 },
      );
    }

    if (user && !user.workspace) {
      const workspace = await prisma.workspace.create({
        data: {
          name: `${user.name}'s Workspace`,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { workspaceId: workspace.id },
      });

      return NextResponse.json(
        {
          user: {
            id: user.id,
            workspaceId: workspace.id,
          },
        },
        { status: 200 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email: body.email,
        name: body.name,
      },
    });

    const workspace = await prisma.workspace.create({
      data: {
        name: `${newUser.name}'s Workspace`,
        userId: newUser.id,
      },
    });

    await prisma.user.update({
      where: { id: newUser.id },
      data: { workspaceId: workspace.id },
    });

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          workspaceId: workspace.id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
