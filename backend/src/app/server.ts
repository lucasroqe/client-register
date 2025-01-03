import Fastify from "fastify";
import { DatabasePostgres } from "../database/db";
import { User } from "../types/user";
import bcrypt from "bcrypt";

const server = Fastify();
const port = 3333;
const saltRounds = 10;

const database = new DatabasePostgres();

server.get("/", async (request, reply) => {
  const data = await database.getUser();

  reply.send(data);
});

server.post("/create/table", async (request, reply) => {
  try {
    await database.createTable();

    reply.status(201).send({
      message: "Tabelas criadas com sucesso",
    });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar tabela" });
  }
});

server.post<{ Body: User }>("/create/user", async (request, reply) => {
  const { name, email, password } = request.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await database.insertUser({ name, email, password: hashedPassword });

    reply.status(202).send({
      message: `Você criou um novo usuário ${name}, ${email}`,
    });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar usuário" });
  }
});

server.delete<{ Params: { id: number } }>(
  "/delete/:id",
  async (request, reply) => {
    const idUser = request.params.id;

    try {
      await database.deleteUser(idUser);
      reply
        .status(202)
        .send({ message: `Usuário ${idUser} deletado com sucesso` });
    } catch (error) {
      reply.status(500).send({ error: `Erro ao deletar usuário ${idUser}` });
    }
  }
);

server.listen({ port: port }, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
