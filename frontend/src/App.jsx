import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayoutPage from "./pages/RootLayout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/SignUp";
import ProfileLayout from "./pages/ProfileLayout";
import ProfilePage, { loader } from "./pages/Profile";
import ErrorPage from "./pages/Error";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "poppins, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
    primary: { main: "#731DD8" },
    secondary: { main: "#0CCA4A" },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <ProfilePage isLoggedInUser={true} />,
        loader: loader,
      },
      {
        path: ":userID",
        element: <ProfilePage isLoggedInUser={false} />,
        loader: loader,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  );
};

export default App;
