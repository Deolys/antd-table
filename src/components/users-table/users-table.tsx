import { Table } from 'antd';
import { useUnit } from 'effector-react';
import type { JSX } from 'react';

import { getFilteredUsersFx } from '@/stores/filters-store';
import { $users } from '@/stores/users-store';

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'identifier', width: '4%' },
  { title: 'Логин', dataIndex: 'login', key: 'login', width: '18%' },
  { title: 'Пароль', dataIndex: 'password', key: 'password', width: '18%' },
  { title: 'Имя', dataIndex: 'name', key: 'name', width: '20%' },
  { title: 'Тип пользователя', dataIndex: 'type', key: 'type', width: '20%' },
  {
    title: 'Время последнего посещения',
    dataIndex: 'last_visit_date',
    key: 'last_visit_date',
    width: '20%',
  },
];

export function UsersTable(): JSX.Element {
  const [users, usersPending] = useUnit([$users, getFilteredUsersFx.pending]);

  return (
    <Table
      bordered
      loading={usersPending}
      dataSource={users}
      columns={columns}
      rowKey={(record) => `${record.id}-${record.login}`}
    />
  );
}

export default UsersTable;
