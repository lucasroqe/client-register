import { pool } from "./connetions";

async function createTable() {
  try {
    const result = await pool.query(
      "CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);"
    );
    console.log("Tabela users criada com sucesso");

    return result;
  } catch (error) {
    console.log("Erro ao criar tabelas");

    throw error;
  }
}

createTable();
