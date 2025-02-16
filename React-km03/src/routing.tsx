import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
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
        element: <BlogPage />,
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
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
