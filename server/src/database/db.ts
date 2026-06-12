import {appConfig} from '../configs/app.config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

// Initialize Drizzle ORM with Neon database client
const client = neon(appConfig.DATABASE_URL);
export const db = drizzle({ client });