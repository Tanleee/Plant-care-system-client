import React from 'react';
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider
} from 'react-router';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
