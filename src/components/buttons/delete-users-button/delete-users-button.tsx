import { Button } from 'antd';
import { useUnit } from 'effector-react';
import type { JSX } from 'react';

import { $selectedUserIds, deleteUsersByIds } from '@/stores/users-store';

export function DeleteUsersButton(): JSX.Element {
  const [selectedUsers, deleteUsers] = useUnit([$selectedUserIds, deleteUsersByIds]);

  return (
    <Button
      danger
      disabled={selectedUsers.length === 0}
      onClick={() => {
        deleteUsers();
      }}
    >
      Удалить выбранных
    </Button>
  );
}
