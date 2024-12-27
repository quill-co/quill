import env from "./src/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/db/schema/*.ts",
    dialect: "sqlite",
    dbCredentials: {
        url: env.DB_FILE_NAME!,
    },
});