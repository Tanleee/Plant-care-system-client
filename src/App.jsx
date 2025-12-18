import React, { useEffect } from "react";
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
import UserAccountPage from "./pages/UserAccountPage";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import rootLoader from "./loaders/rootLoader";
import chartDataLoader from "./loaders/chartsDataLoader";
import controlsDataLoader from "./loaders/controlsDataLoader";
import historyDataLoader from "./loaders/historyDataLoader";
import sensorDataLoader from "./loaders//sensorDataLoader";

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={rootLoader} id="root">
        <Route index element={<HomePage />} loader={sensorDataLoader} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="user" element={<UserAccountPage />} />
        <Route
          path="charts"
          element={
            <ProtectedRoute>
              <ChartsPage />
            </ProtectedRoute>
          }
          loader={chartDataLoader}
        />
        <Route
          path="controls"
          element={
            <ProtectedRoute>
              <ControlPage />
            </ProtectedRoute>
          }
          loader={controlsDataLoader}
        />
        <Route
          path="history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
          loader={historyDataLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
