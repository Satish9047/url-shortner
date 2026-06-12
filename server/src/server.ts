import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { appConfig } from './configs/app.config';
import app from './app';
import { db } from './database/db';

const PORT = appConfig.PORT;

// validate database connection URL
if (!appConfig.DATABASE_URL) {
  console.error('database connection URL is missing');
  process.exit(1);
}

// Initialize Drizzle ORM with Neon database client
// const client = neon(appConfig.DATABASE_URL);
// export const db = drizzle({ client });

// Start the server after ensuring database connectivity
async function startServer() {
  try {
    console.log('connecting to database');
    await db.execute(sql`SELECT 1`);
    console.log('Connected to database successfully');
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect database:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Start Server
startServer();