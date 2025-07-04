"use server";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and, gte, lte } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { addDays, endOfDay, startOfDay } from "date-fns";

// Create a new event
export async function createEvent(data: {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string;
  platform: string;
  status: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const id = nanoid();

  try {
    await db.insert(events).values({
      id,
      userId: session.user.id,
      title: data.title || "(no title)",
      description: data.description || "",
      start: new Date(data.start),
      end: new Date(data.end),
      color: data.color ?? "sky",
      platform: data.platform,
      status: data.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Revalidate the path to ensure fresh data
    revalidatePath("/");

    return { id, success: true };
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

export async function getEvents() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    return await db
      .select()
      .from(events)
      .where(eq(events.userId, session.user.id))
      .orderBy(events.start); // Order by start date for better UX
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}

export async function getEventById(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const result = await db
      .select()
      .from(events)
      .where(and(eq(events.id, id), eq(events.userId, session.user.id)))
      .limit(1);

    return result[0];
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event");
  }
}

export async function updateEvent(
  id: string,
  data: {
    title?: string;
    description?: string;
    start?: Date;
    end?: Date;
    color?: string;
    platform?: string;
    status?: string;
  }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    // Only update fields that are provided
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.start !== undefined) updateData.start = new Date(data.start);
    if (data.end !== undefined) updateData.end = new Date(data.end);
    if (data.color !== undefined) updateData.color = data.color;
    if (data.platform !== undefined) updateData.platform = data.platform;
    if (data.status !== undefined) updateData.status = data.status;

    const result = await db
      .update(events)
      .set(updateData)
      .where(and(eq(events.id, id), eq(events.userId, session.user.id)));

    // Revalidate the path to ensure fresh data
    revalidatePath("/");

    return { success: true, result };
  } catch (error) {
    console.error("Error updating event:", error);
    throw new Error("Failed to update event");
  }
}

export async function deleteEvent(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    const result = await db
      .delete(events)
      .where(and(eq(events.id, id), eq(events.userId, session.user.id)));

    // Revalidate the path to ensure fresh data
    revalidatePath("/");

    return { success: true, result };
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new Error("Failed to delete event");
  }
}

export async function getRecentEventsAroundToday() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) throw new Error("Unauthorized");

  const today = new Date();
  const startDate = startOfDay(addDays(today, -2));
  const endDate = endOfDay(addDays(today, 2));

  try {
    return await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.userId, session.user.id),
          gte(events.start, startDate),
          lte(events.start, endDate)
        )
      )
      .orderBy(events.start);
  } catch (error) {
    console.error("Error fetching recent events:", error);
    throw new Error("Failed to fetch recent events");
  }
}
