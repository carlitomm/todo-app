import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { addTodo, updateTodo } from "../store/slices/todoSlice";
import { v4 as uuidv4 } from "uuid";

interface Props {
    editId?: string;
}

export default function TodoForm({ editId }: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const existing = useSelector((state: RootState) =>
        state.todos.todos.find((t: any) => t.id === editId)
    );

    const [title, setTitle] = useState(existing?.title || "");
    const [description, setDescription] = useState(existing?.description || "");
    const [dueDate, setDueDate] = useState(existing?.dueDate || "");
    const [categoryId, setCategoryId] = useState(existing?.categoryId || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editId) {
            dispatch(updateTodo({
                id: editId,
                title,
                description,
                dueDate,
                completed: existing!.completed,
                categoryId,
                createdAt: existing!.createdAt
            }));
            navigate("/");
            return;
        }

        dispatch(addTodo({
            id: uuidv4(),
            title,
            description,
            dueDate,
            completed: false,
            categoryId,
            createdAt: new Date().toISOString()
        }));

        setTitle("");
        setDescription("");
        setDueDate("");
        setCategoryId("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select category</option>
                {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>

            <button type="submit">
                {editId ? "Save Changes" : "Add Todo"}
            </button>
        </form>
    );
}
