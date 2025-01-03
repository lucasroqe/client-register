import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "register-db",
  password: "123",
  port: 5432,
});

export { pool };
