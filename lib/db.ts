import { neon } from '@neondatabase/serverless';

// Create a mock sql function that returns empty results when DB is not configured
const createMockSql = () => {
  return (...args: any[]) => {
    console.warn('Database not configured - returning empty results');
    return Promise.resolve([]);
  };
};

export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : createMockSql();