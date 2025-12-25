import React, { useEffect } from "react";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AlarmPage from "./pages/AlarmPage";
import StopWatchPage from "./pages/StopWatchPage";
import TimerPage from "./pages/TimerPage";
import WordlClockPage from "./pages/WordlClockPage";
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
        <Route path="user" element={<UserAccountPage />} />
        <Route
          path="alarm"
          element={
            <ProtectedRoute>
              <AlarmPage />
            </ProtectedRoute>
          }
          loader={alarmLoader}
        />
        <Route path="stopwatch" element={<StopWatchPage />} />
        <Route path="timer" element={<TimerPage />} />
        <Route path="worldclock" element={<WordlClockPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
