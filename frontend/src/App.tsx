/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";
import { userService } from "./services/userService";
import { useEffect } from "react";
import UserWrapper from "./components/Users/UserWrapper";
import { User } from "./types/User";

function App() {
  const [user, setUser] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    handleLoad();
  }, [user]);

  async function handleLoad() {
    try {
      const response = await userService.listarUsuarios();
      setUser(response.data);
    } catch (error) {
      toast.error("Erro ao carregar usuários");
    }
  }

  async function handleDelete(id: number) {
    try {
      await userService.deletarUsuario(id);
      const newArray = user.filter((user) => user.id !== id);
      setUser(newArray);
      toast.success("Usuário deletado com sucesso");
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    }
  }

  async function handleCreateUser() {
    try {
      const response = await userService.criarUsuario(
        form.name,
        form.email,
        form.password
      );
      setUser((oldUsers) => [...oldUsers, response.data]);
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error("Erro ao criar usuário");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <h1>Client Register</h1>

        <div className={styles.form}>
          <form
            action=""
            id="client"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateUser();
            }}
          >
            <div>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>E-mail: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.button}>
              <button type="submit">
                CREATE
              </button>
            </div>
          </form>
        </div>
        <UserWrapper user={user} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
