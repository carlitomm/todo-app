import { useDispatch } from "react-redux";
import { deleteTodo, deleteTodoApi, toggleComplete, updateTodoApi } from "../store/slices/todoSlice";
import { Link } from "react-router-dom";
import type { ITodo } from "../types/todo";

export default function TodoItem({ todo }: any) {
    const dispatch = useDispatch();

    return (
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex justify-between items-start">

            <div className="flex gap-3">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                        dispatch(toggleComplete(todo.id))
                        dispatch(updateTodoApi({ ...todo, completed: !todo.completed }));
                    }}
                    className="mt-1 h-5 w-5 accent-blue-600"
                />

                <div>
                    <div className={`font-semibold text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                        {todo.title}
                    </div>

                    {todo.description && (
                        <div className="text-gray-600 text-sm mt-1">{todo.description}</div>
                    )}

                    <div className="text-xs text-gray-500 mt-1">
                        Due: {todo.dueDate || "No due date"}
                    </div>

                    <div className="flex gap-4 mt-3 text-sm">
                        <Link to={`/edit/${todo.id}`} className="text-blue-600 hover:underline">
                            Edit
                        </Link>

                        <button
                            onClick={() => {
                                dispatch(deleteTodo(todo.id));
                                dispatch(deleteTodoApi(todo.id));
                            }}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

