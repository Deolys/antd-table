import { ConfigProvider } from 'antd';
import type { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PageRoutes } from './routes';

const App = (): JSX.Element => (
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          headerBg: '#52618d',
          siderBg: '#f7f9ff',
        },
      },
    }}
  >
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  </ConfigProvider>
);

export default App;
