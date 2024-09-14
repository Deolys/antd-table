import { Layout } from 'antd';
import type { JSX } from 'react';

import { UsersTable } from '@/components/users-table';

const { Header, Sider, Content } = Layout;

export function MainPage(): JSX.Element {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content style={{ marginInline: 70 }}>
          <UsersTable />
        </Content>
        <Sider
          width={320}
          collapsible
          collapsedWidth={0}
          zeroWidthTriggerStyle={{
            insetInlineStart: '-40px',
            borderRadius: '6px 0 0 6px',
            backgroundColor: '#d5dfff',
            color: '#1890ff',
          }}
          style={{
            height: '100vh',
            position: 'sticky',
            top: 0,
            right: 0,
            backgroundColor: '#f7f9ff',
            boxShadow: '0 0 8px 8px rgba(59, 84, 108, 0.1)',
          }}
        >
        </Sider>
      </Layout>
    </Layout>
  );
}

export default MainPage;
