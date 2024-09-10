import { createBrowserRouter } from "react-router-dom";
import { Admin } from "./pages/Admin";
import { Home } from "./pages/Home";
import { ErrorPage } from "./pages/ErrorPage";

import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Settings } from "./pages/Settings";
import { Users } from "./pages/users/Users";
import { Modules } from "./pages/modules/Modules";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/sign-up",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "admin/",
          element: <Admin />,
        },
        {
          path: "admin/settings",
          element: <Settings />,
        },
        {
          path: "admin/users",
          element: <Users />,
        },
        {
          path: "admin/modules",
          element: <Modules />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ],
  { basename: "/" }
);
