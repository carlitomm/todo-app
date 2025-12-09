import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete } from "../store/slices/todoSlice";
import { Link } from "react-router-dom";

export default function TodoItem({ todo }: any) {
    const dispatch = useDispatch();

    return (
        <div style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px"
        }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
            />

            <strong style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
            </strong>

            <div>{todo.description}</div>
            <small>Due: {todo.dueDate || "No date"}</small>

            <div style={{ marginTop: "10px" }}>
                <Link to={`/edit/${todo.id}`}>Edit</Link>
                <button onClick={() => dispatch(deleteTodo(todo.id))}>
                    Delete
                </button>
            </div>
        </div>
    );
}
