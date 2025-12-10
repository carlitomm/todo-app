import { useEffect } from "react";
import FilterBar from "../components/FilterBar";
import SortBar from "../components/SortBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { fetchTodos } from "../store/slices/todoSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { useDispatch } from 'react-redux'
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        dispatch(fetchCategories());
    }, []);

    return (
        <div className="text-center flex flex-col items-center p-2">

            <div className="flex items-center gap-3 mt-4">

                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm">
                    <CheckCircleIcon className="h-6 w-6" />
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-800">Todo App</h1>
            </div>

            <TodoForm />
            <FilterBar />
            <SortBar />
            <TodoList />

        </div>
    );
}
