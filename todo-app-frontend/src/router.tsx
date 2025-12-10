import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditTodoPage from "./pages/EditTodoPage";

export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/edit/:id", element: <EditTodoPage /> },
]);