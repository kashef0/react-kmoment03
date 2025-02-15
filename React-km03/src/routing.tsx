import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LogInPage from "./pages/LoginPage/LogInPage";
import CategoryPage from "./pages/Category/CategoryPage";
import AddCategoryPage from "./pages/AddCategoryForm/AddCategoryPage";
import UpdateCategoryForm from "./pages/UpdateCategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/LoginPage",
        element: <LogInPage />,
      },
      {
        path: "/Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/CategoryPage",
        element: (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/UpdateCategoryForm/:id",
        element: (
          <ProtectedRoute>
            <UpdateCategoryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/AddCategoryPage",
        element: (
          <ProtectedRoute>
            <AddCategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "*", // Catch-all route for 404
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);

export default router;
