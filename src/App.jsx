import React from "react";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ChartsPage from "./pages/ChartsPage";
import ControlPage from "./pages/ControlsPage";
import HistoryPage from "./pages/HistoryPage";

import currentUserLoader from "./loaders/currentUserLoader";
import UserAccountPage from "./pages/UserAccountPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={currentUserLoader} id="root">
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="user" element={<UserAccountPage />} />
        <Route path="charts" element={<ChartsPage />} />
        <Route path="controls" element={<ControlPage />} />
        <Route path="history" element={<HistoryPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
