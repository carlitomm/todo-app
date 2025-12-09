import FilterBar from "../components/FilterBar";
import SortBar from "../components/SortBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function HomePage() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Todo App</h1>

            <TodoForm />

            <FilterBar />
            <SortBar />

            <TodoList />
        </div>
    );
}
