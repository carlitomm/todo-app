import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import TodoItem from "./TodoItem";


export default function TodoList() {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const categories = useSelector((state: RootState) => state.categories.categories);

    return (
        <div>
            {categories.map((category: any) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>

                    {todos
                        .filter((t: any) => t.categoryId === category.id)
                        .map((t: any) => <TodoItem key={t.id} todo={t} />)}
                </div>
            ))}

            <h3>Other</h3>
            {todos
                .filter((t: any) => !t.categoryId)
                .map((t: any) => <TodoItem key={t.id} todo={t} />)}
        </div>
    );
}
