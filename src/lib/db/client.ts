import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import env from "@/lib/env";

const sqlite = new Database(env.DB_FILE_NAME);
export const db = drizzle(sqlite);