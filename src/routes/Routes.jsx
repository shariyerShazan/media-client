import { createBrowserRouter } from "react-router";

import React from "react";
import MainLayout from "../layout/MainLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
]);
