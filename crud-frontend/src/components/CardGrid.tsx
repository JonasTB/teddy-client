import Card from './Card';

interface User {
  id: number;
  name: string;
  wage: number;
  enterprise: number;
}

interface CardGridProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onSelect: (user: User) => void;
}

function CardGrid({ users, onEdit, onDelete, onSelect }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <Card
          key={user.id}
          user={user}
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
          onSelect={() => onSelect(user)}
        />
      ))}
    </div>
  );
}

export default CardGrid;