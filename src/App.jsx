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
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import userLoader from "./loaders/userLoader";
import alarmLoader from "./loaders/alarmLoader";

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" loader={userLoader} id="root">
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="user"
          element={ 
            
              <UserAccountPage />
          
          }
        />
        <Route
          path="charts"
          element={
           
              <ChartsPage />
           
          }
        />
        <Route
          path="controls"
          element={
         
              <ControlPage />
            
          }
        />
        <Route
          path="history"
          element={
           
              <HistoryPage />
           
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
