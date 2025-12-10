import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { addTodo, createTodo, updateTodo, updateTodoApi } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";
import CategorySelector from "./CategorySelector";
import type { ITodo } from "../types/todo";

interface Props {
    editId?: string;
}

export default function TodoForm({ editId }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const existing = useSelector((state: RootState) =>
        state.todos.todos.find((t: ITodo) => t.id === editId)
    );
    const today = new Date().toLocaleDateString("en-CA");

    const [title, setTitle] = useState(existing?.title || "");
    const [description, setDescription] = useState(existing?.description || "");
    const [dueDate, setDueDate] = useState(existing?.dueDate || "");
    const [categoryId, setCategoryId] = useState(existing?.categoryId || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        const todo = {
            id: editId || uuidv4(),
            title,
            description,
            dueDate,
            completed: existing?.completed ?? false,
            categoryId,
            createdAt: existing?.createdAt ?? new Date().toISOString(),
        };

        if (editId) {
            dispatch(updateTodoApi(todo));
            navigate("/");
        } else {
            dispatch(createTodo(todo));
        }

        setTitle("");
        setDescription("");
        setDueDate("");
        setCategoryId("");
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 mb-4 max-w-fit">

            <div className="flex items-center py-2">
                <input
                    type="text"
                    placeholder="Todo title"
                    className="flex-grow border rounded-lg p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <button type="submit" className="text-gray-500 hover:bg-blue-700 text-white bg-blue-600 hover:text-gray-700 rounded-lg ml-3 p-2">
                    {editId ? "Save Changes" : "+ Add"}
                </button>
            </div>

            <div className="space-y-4 bg-white ">
                <textarea
                    placeholder="Description"
                    className="w-full border rounded-lg p-2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex gap-4">
                <input
                    type="date"
                    min={today}
                    className="flex-grow border rounded-lg p-2"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <div className="flex-grow">
                    <CategorySelector
                        value={categoryId}
                        onChange={(id) => setCategoryId(id)}
                    />
                </div>
            </div>
        </form>
    );
}
