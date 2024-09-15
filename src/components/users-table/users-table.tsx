import { Button, Table } from 'antd';
import { useUnit } from 'effector-react';
import { type JSX, type Key, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import editIcon from '@/assets/icons/edit-icon.svg';
import { pageRoutes } from '@/constants/page-routes';
import { userTableHeaders } from '@/constants/users-table-headers';
import { getFilteredUsersFx } from '@/stores/filters-store';
import { $selectedUserIds, $users, getUsersFx, selectUserIds } from '@/stores/users-store';
import { User } from '@/types/user';

export function UsersTable(): JSX.Element {
  const navigate = useNavigate();
  const [users, selectedUserIds, usersPending, setSelectedUsers] = useUnit([
    $users,
    $selectedUserIds,
    getFilteredUsersFx.pending,
    selectUserIds,
  ]);

  useEffect(() => {
    getUsersFx();
  }, []);

  const columns = [
    ...userTableHeaders,
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (record: User) => (
        <Button
          icon={
            <img width={24} height={24} src={editIcon} title="Редактировать" alt="Редактирование" />
          }
          onClick={() => navigate(`${pageRoutes.USER_FORM}/${record.id}`)}
        />
      ),
      width: '4%',
    },
  ];

  const rowSelection = {
    onChange: (_: Key[], selectedRows: User[]) => {
      setSelectedUsers(selectedRows.map((r) => r.id));
    },
    selectedRowKeys: selectedUserIds,
  };

  return (
    <Table
      bordered
      loading={usersPending}
      dataSource={users}
      columns={columns}
      rowKey={(record) => record.id}
      rowSelection={{
        type: 'checkbox',
        ...rowSelection,
      }}
    />
  );
}

export default UsersTable;
