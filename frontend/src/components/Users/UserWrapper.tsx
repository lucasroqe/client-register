import { FaTrash } from "react-icons/fa";
import { User } from "../../types/User";

interface UserWrapperProps {
  user: User[];
  onDelete: (id:number) => void
}

export default function UserWrapper({ user, onDelete }: UserWrapperProps) {

  return (
    <div>
      <div>
        {user.map((user, id) => (
          <div key={id}>
            {user.name} - {user.email}
            <FaTrash onClick={() => onDelete(user.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
