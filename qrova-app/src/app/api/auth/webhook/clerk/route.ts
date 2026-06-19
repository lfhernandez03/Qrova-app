import { Webhook } from "svix";
import { headers } from "next/headers";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.text();
  const headerPayload = await headers();

  const webHook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET!);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let event: any;

  try {
    event = webHook.verify(payload, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  if (event.type === "user.created") {
    const { id: clerkId, email_addresses, first_name } = event.data;
    const email = email_addresses[0]?.email_address;

    if (!email) {
      return new Response("Missing email", { status: 400 });
    }

    try {
      const user = await prisma.user.create({
        data: {
          clerkId,
          email,
          name: first_name ?? null,
        },
      });

      const workspace = await prisma.workspace.create({
        data: {
          userId: user.id,
          name: `${first_name ?? "My"}'s Workspace`,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { workspaceId: workspace.id },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  return new Response("OK", { status: 200 });
}
