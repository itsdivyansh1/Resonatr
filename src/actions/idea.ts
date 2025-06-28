"use server";

import { db } from "@/db/drizzle";
import { ideas } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

// Create a new idea
export async function createIdea(data: {
  title: string;
  platform: string;
  stage: string;
  content: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Unauthorized");

  await db.insert(ideas).values({
    id: nanoid(),
    userId: session.user.id,
    title: data.title,
    platform: data.platform,
    stage: data.stage,
    description: data.content,
  });
}

// Get all ideas for current user
export async function getIdeas() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) throw new Error("Unauthorized");

  return await db.select().from(ideas).where(eq(ideas.userId, session.user.id));
}

// Get total idea count for the current user
export async function getIdeasCount(): Promise<number> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) throw new Error("Unauthorized");

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(ideas)
    .where(eq(ideas.userId, session.user.id));

  return Number(result[0]?.count ?? 0);
}

// Get a single idea by ID
export async function getIdeaById(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) throw new Error("Unauthorized");

  const result = await db.select().from(ideas).where(eq(ideas.id, id)).limit(1);

  return result[0];
}

// Update an idea
export async function updateIdea(
  id: string,
  data: {
    title?: string;
    platform?: string;
    stage?: string;
    content?: string;
  }
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) throw new Error("Unauthorized");

  return await db
    .update(ideas)
    .set({
      ...(data.title && { title: data.title }),
      ...(data.platform && { platform: data.platform }),
      ...(data.stage && { stage: data.stage }),
      ...(data.content && { description: data.content }),
    })
    .where(eq(ideas.id, id));
}

// Delete an idea
export async function deleteIdea(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) throw new Error("Unauthorized");

  return await db.delete(ideas).where(eq(ideas.id, id));
}
