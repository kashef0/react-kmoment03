import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import LogInPage from "./pages/LoginPage/LogInPage";
import CategoryPage from "./pages/CategoryPages/CategoryPage";
import AddCategoryPage from "./pages/CategoryPages/AddCategoryPage";
import UpdateCategoryForm from "./pages/CategoryPages/UpdateCategoryPage";
import BlogPage from "./pages/BlogPages/BlogPage";
import AddBlogPage from "./pages/BlogPages/AddBlogPage";
import UpdateBlogPage from "./pages/BlogPages/UpdateBlogPage";
import CreateUserPage from "./pages/UserPages/CreateUserPage";


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
        path: "/CreateUserPage",
        element: <CreateUserPage />,
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
        path: "/BlogPage",
        element: <BlogPage />
          
      },
      {
        path: "/AddBlogPage",
        element: (
          <ProtectedRoute>
            <AddBlogPage  />
          </ProtectedRoute>
        ),
      },
      {
        path: "/UpdateBlogPage/:id",
        element: (
          <ProtectedRoute>
            <UpdateBlogPage />
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
        path: "*", 
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);

export default router;
