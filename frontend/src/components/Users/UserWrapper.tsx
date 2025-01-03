import { FaTrash } from "react-icons/fa";
import { User } from "../../types/User";
import styles from "./UserWrapper.module.css";

interface UserWrapperProps {
  user: User[];
  onDelete: (id: number) => void;
}

export default function UserWrapper({ user, onDelete }: UserWrapperProps) {
  return (
    <div className={styles.wrapper}>
      {user.map((user) => (
        <div key={user.id} className={styles.content}>
          <div className={styles.info}>
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>E-mail:</strong> {user.email}
            </div>
          </div>
          <FaTrash onClick={() => onDelete(user.id)} className={styles.icon} />
        </div>
      ))}
    </div>
  );
}
