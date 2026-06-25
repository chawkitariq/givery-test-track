import fs from "node:fs";
import mysql from "mysql2/promise";
import "dotenv/config";
import { initDbSql } from "./contants.js";

const isProduction = process.env.NODE_ENV === "production";
const sslCaPath = process.env.DB_SSL_CA_PATH;
const ssl =
  isProduction && sslCaPath != null && sslCaPath !== ""
    ? {
        ca: fs.readFileSync(sslCaPath, "utf8"),
      }
    : undefined;

export const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: +process.env.DB_PORT! || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  ssl,
});

await db.query(initDbSql);
