import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "./layouts/default";
import { Assets } from "./pages/assets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/:id", element: <Assets /> }],
  },
]);
