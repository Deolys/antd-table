import { Button, Table } from 'antd';
import { useUnit } from 'effector-react';
import type { JSX, Key } from 'react';
import { useNavigate } from 'react-router-dom';

import editIcon from '@/assets/icons/edit-icon.svg';
import { getFilteredUsersFx } from '@/stores/filters-store';
import { $users, selectUserIds } from '@/stores/users-store';
import { User } from '@/types/user';

export function UsersTable(): JSX.Element {
  const navigate = useNavigate();
  const [users, usersPending, setSelectedUsers] = useUnit([
    $users,
    getFilteredUsersFx.pending,
    selectUserIds,
  ]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'identifier', width: '2%' },
    { title: 'Логин', dataIndex: 'login', key: 'login', width: '18%' },
    { title: 'Пароль', dataIndex: 'password', key: 'password', width: '18%' },
    { title: 'Имя', dataIndex: 'name', key: 'name', width: '18%' },
    { title: 'Тип пользователя', dataIndex: 'type', key: 'type', width: '18%' },
    {
      title: 'Время последнего посещения',
      dataIndex: 'last_visit_date',
      key: 'last_visit_date',
      width: '18%',
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (record: User) => (
        <Button
          type="link"
          icon={
            <img width={24} height={24} src={editIcon} title="Редактировать" alt="Редактирование" />
          }
          onClick={() => navigate(`/user/${record.id}`)}
        />
      ),
      width: '4%',
    },
  ];

  const rowSelection = {
    onChange: (_: Key[], selectedRows: User[]) => {
      setSelectedUsers(selectedRows.map((r) => r.id));
    },
  };

  return (
    <Table
      bordered
      loading={usersPending}
      dataSource={users}
      columns={columns}
      rowKey={(record) => `${record.id}-${record.login}`}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
}

export default UsersTable;
