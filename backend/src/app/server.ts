import Fastify from "fastify";
import { DatabasePostgres } from "../database/db";
import { User } from "../types/user";

const server = Fastify();
const porta = 3333;

const database = new DatabasePostgres();

server.get("/", async (request, reply) =>{
  const data = await database.getUsers()

  reply.send(data)
})


server.post("/table", async (request, reply) => {
  try {
    await database.criar();

    reply.status(202).send(console.log("Tabelas criadas"));
  } catch (error) {
    console.log("Erro ao criar tabela");
  }
});

server.post<{ Body: User }>("/create", async (request, reply) => {
  const { name, email, password } = request.body;

  await database.inserir({ name, email, password });

  reply
    .status(202)
    .send(
      console.log(`Você criou um novo usuário ${name}, ${email}, ${password}`)
    );
});

server.delete<{ Params: { id: number } }>(
  "/delete/:id",
  async (request, reply) => {
    const idUser = request.params.id;

    try {
      await database.deletar(idUser);
      reply
        .status(202)
        .send(console.log(`Usuário ${idUser} deletado com sucesso`));
    } catch (error) {
      console.log(`Erro ao deletar usuário ${idUser}`);
    }
  }
);

server.listen({ port: porta }, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
