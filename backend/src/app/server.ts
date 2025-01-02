import Fastify from "fastify";
import { DatabasePostgres } from "../database/db";
import { User } from "../types/user";

const server = Fastify();
const porta = 3333;

const database = new DatabasePostgres();

server.get("/", async (request, reply) => {
  const data = await database.getUsers();

  reply.send(data);
});

server.post("/create/table", async (request, reply) => {
  try {
    await database.criar();

    reply.status(201).send({
      message: "Tabelas criadas com sucesso",
    });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao criar tabela" });
  }
});

server.post<{ Body: User }>("/create/user", async (request, reply) => {
  const { name, email, password } = request.body;

  try {
    await database.inserir({ name, email, password });

    reply.status(202).send({
      message: `Você criou um novo usuário ${name}, ${email}, ${password}`,
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
      await database.deletar(idUser);
      reply
        .status(202)
        .send({ message: `Usuário ${idUser} deletado com sucesso` });
    } catch (error) {
      reply.status(500).send({ error: `Erro ao deletar usuário ${idUser}` });
    }
  }
);

server.listen({ port: porta }, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
