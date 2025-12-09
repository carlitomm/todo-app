import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditTodoPage from "./pages/EditTodoPage";
import CategoriesPage from "./pages/CategoriesPage";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/edit/:id", element: <EditTodoPage /> },
    { path: "/categories", element: <CategoriesPage /> },
]);