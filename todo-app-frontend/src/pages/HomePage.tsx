import { useEffect } from "react";
import FilterBar from "../components/FilterBar";
import SortBar from "../components/SortBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { fetchTodos } from "../store/slices/todoSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { useDispatch } from 'react-redux'

export default function HomePage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        dispatch(fetchCategories());
    }, []);

    return (
        <div class="text-center flex flex-col items-center p-2">
            <h1>Todo App</h1>

            <TodoForm />
            <FilterBar />
            <SortBar />
            <TodoList />

        </div>
    );
}
