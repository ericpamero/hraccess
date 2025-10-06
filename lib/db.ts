// /lib/db.ts
import sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// keep a global pool to avoid multiple pools during HMR / serverless warm-ups
let poolPromise: Promise<sql.ConnectionPool> | null = null;

export function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config);
  }
  return poolPromise;
}
