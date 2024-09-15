import { Button, Popconfirm } from 'antd';
import { useUnit } from 'effector-react';
import type { JSX } from 'react';

import { $selectedUserIds, deleteUsersByIds } from '@/stores/users-store';

export function DeleteUsersButton(): JSX.Element {
  const [selectedUsers, deleteUsers] = useUnit([$selectedUserIds, deleteUsersByIds]);

  return (
    <Popconfirm
      title="Удаление"
      description="Вы уверены, что хотите удалить выбранных пользователей?"
      onConfirm={() => deleteUsers()}
      okText="Да"
      cancelText="Нет"
      okButtonProps={{ style: { width: 70 } }}
      cancelButtonProps={{ style: { width: 70 } }}
    >
      <Button danger disabled={selectedUsers.length === 0}>
        Удалить выбранных
      </Button>
    </Popconfirm>
  );
}
