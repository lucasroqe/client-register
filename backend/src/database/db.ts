import { pool } from "./connetions";
import { User } from "../types/user";

export class DatabasePostgres {
  async createTable() {
    const result = await pool.query(
      "CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);"
    );

    return result;
  }

  async getUser() {
    const result = await pool.query("SELECT * FROM users");

    return result.rows;
  }

  async insertUser({ name, email, password }: User) {
    const result = await pool.query(
      "INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, password]
    );

    return result.rows[0].id;
  }

  async deleteUser(id: number) {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);

    return result;
  }
}
