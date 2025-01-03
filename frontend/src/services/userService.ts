import { api } from "./api";

export const userService = {
  async listarUsuarios() {
    return await api.get("/");
  },

  async criarTabela() {
    return await api.post("/creata/table");
  },

  async criarUsuario(name: string, email: string, password: string) {
    return await api.post("/create/user", { name, email, password });
  },

  async deletarUsuario(id: number) {
    return await api.delete(`/delete/${id}`);
  },
};
