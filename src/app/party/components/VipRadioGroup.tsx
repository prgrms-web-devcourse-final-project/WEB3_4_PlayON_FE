import UserInfoVertical from './UserInfoVertical';
import User from '@/types/user';

interface VipRadioGroupProps {
  users: User[];
  onClick: (value: string) => void;
}

export default function VipRadioGroup({ users, onClick }: VipRadioGroupProps) {
  return (
    <div>
      <div className="flex gap-4 overflow-x-auto">
        {users.map((user, idx) => (
          <UserInfoVertical key={idx} data={user} isRadioBtn name="vip" onSelected={onClick} />
        ))}
      </div>
    </div>
  );
}
