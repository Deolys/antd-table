import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page';
import { UserPage } from './pages/user-page';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/:id" element={<UserPage />} />
    </Routes>
  );
};
