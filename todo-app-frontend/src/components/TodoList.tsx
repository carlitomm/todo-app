import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import { selectProcessedTodos } from "../store/slices/todoSlice";


export default function TodoList() {
    const todos = useSelector(selectProcessedTodos);
    const categories = useSelector((state: RootState) => state.categories.categories);

    const todosWithNoCategory = todos.filter(todo => !todo.categoryId).map(todo => <TodoItem key={todo.id} todo={todo} />)

    return (
        <div className="mt-8 space-y-8 w-full">

            {categories
                .filter(cat => todos.some(todo => todo.categoryId === cat.id)) // ⬅️ only categories with todos
                .map(cat => (
                    <div key={cat.id}>
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">{cat.name}</h2>

                        <div className="space-y-3">
                            {todos
                                .filter(todo => todo.categoryId === cat.id)
                                .map(todo => (
                                    <TodoItem key={todo.id} todo={todo} />
                                ))}
                        </div>
                    </div>
                ))}

            {todosWithNoCategory.length > 0 ? <h2 className="text-lg font-semibold text-gray-800 mb-4">Other</h2> : ""}
            <div className="space-y-3">
                {todosWithNoCategory}
            </div>
        </div>
    );
}
