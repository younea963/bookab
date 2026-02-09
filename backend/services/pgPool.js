import pg from "pg";
import keys from "../config/keys.js";

const { Pool } = pg;

const isRender = !!process.env.DATABASE_URL;


const pgPool = new Pool(
  isRender
    ? {
        connectionString: process.env.DATABASE_URL,
       
        ssl: { rejectUnauthorized: false }  // SSL is often required for managed Postgres; safe default
      }
    : {
        user: keys.pgUser,
        host: keys.pgHost,
        database: keys.pgDatabase,
        password: keys.pgPassword,
        port: keys.pgPort
      }
);

export default pgPool;
