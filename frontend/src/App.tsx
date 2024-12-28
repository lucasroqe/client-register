import { useState } from "react";
import styles from "./App.module.css";
import { ToastContainer, toast } from "react-toastify";

function App() {

  
  const showToastMessage = () => {
    toast.success("Usuário criado!", {
      position: "top-right",
    });
  };

  const [user,setUser] = useState([])

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <h1>Client Register</h1>

        <div className={styles.form}>
          <form action="" id="client">
            <div>
              <label htmlFor="">Name: </label>
              <input type="text" name="" id="" />
            </div>
            <div>
              <label htmlFor="">E-mail: </label>
              <input type="email" name="" id="" />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input type="password" name="" id="" />
            </div>
          </form>
          <div className={styles.button} onClick={showToastMessage}>
            <button type="submit" form="">
              CREATE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;