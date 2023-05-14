import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayoutPage from "./pages/RootLayout";

const router = createBrowserRouter([
  { path: "/", element: <RootLayoutPage />, children: [] },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
