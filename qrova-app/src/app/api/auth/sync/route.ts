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

  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { workspace: true },
  });

  if (user && user.workspace) {
    return NextResponse.json(
      {
        user: {
          id: user.id,
          workspaceId: user.workspace.id,
        },
      },
      { status: 200 },
    );
  }
}
