import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!, {
  prepare: false,
  max: 1,
});
export const db = drizzle(queryClient);
