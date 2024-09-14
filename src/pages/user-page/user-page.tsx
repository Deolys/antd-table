import { Button, Layout } from 'antd';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserForm } from '@/components/user-form';

const { Header, Content } = Layout;

export function UserPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header style={{ backgroundColor: '#52618d' }}>
        <Button onClick={() => navigate('/')}>На главную</Button>
      </Header>
      <Content style={{ marginInline: 50 }}>
        <UserForm />
      </Content>
    </Layout>
  );
}

export default UserPage;
