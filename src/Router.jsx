import { createBrowserRouter } from "react-router";
import RootLayout from "./components/Layouts/RootLayout";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFoundPage/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
