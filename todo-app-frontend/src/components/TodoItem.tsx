import { useDispatch } from "react-redux";
import { deleteTodo, deleteTodoApi, toggleComplete, updateTodoApi } from "../store/slices/todoSlice";
import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ITodo } from "../types/todo";

interface TodoItemProps {
    todo: ITodo;
}

export default function TodoItem({ todo }: TodoItemProps) {
    const dispatch = useDispatch();

    return (
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-start justify-between">

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

                </div>
            </div>

            <div className="flex items-center gap-4 pr-2">

                <Link to={`/edit/${todo.id}`}>
                    <PencilIcon className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer transition" />
                </Link>

                <button onClick={() => dispatch(deleteTodoApi(todo.id))}>
                    <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer transition" />
                </button>
            </div>

        </div>
    );
}

