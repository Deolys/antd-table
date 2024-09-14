import type { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page';

export const PageRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};
