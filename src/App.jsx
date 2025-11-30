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
import UserAccountPage from "./pages/UserAccountPage";

import rootLoader from "./loaders/rootLoader";
import chartDataLoader from "./loaders/chartsDataLoader";
import controlsDataLoader from "./loaders/controlsDataLoader";
import historyDataLoader from "./loaders/historyDataLoader";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={rootLoader} id="root">
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="user" element={<UserAccountPage />} />
        <Route
          path="charts"
          element={<ChartsPage />}
          loader={chartDataLoader}
        />
        <Route
          path="controls"
          element={<ControlPage />}
          loader={controlsDataLoader}
        />
        <Route
          path="history"
          element={<HistoryPage />}
          loader={historyDataLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
