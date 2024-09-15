import { Button, Layout } from 'antd';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserForm } from '@/components/user-form';
import { pageRoutes } from '@/constants/page-routes';

const { Header, Content } = Layout;

export function UserPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header>
        <Button onClick={() => navigate(pageRoutes.MAIN)}>На главную</Button>
      </Header>
      <Content style={{ marginInline: 50 }}>
        <UserForm />
      </Content>
    </Layout>
  );
}

export default UserPage;
