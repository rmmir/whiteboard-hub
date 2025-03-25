import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './src/app/db/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
