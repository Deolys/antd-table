import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { pageRoutes } from './constants/page-routes';
import { MainPage } from './pages/main-page';
import { UserPage } from './pages/user-page';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path={pageRoutes.MAIN} element={<MainPage />} />
      <Route path={pageRoutes.USER_FORM_ID} element={<UserPage />} />
    </Routes>
  );
};
