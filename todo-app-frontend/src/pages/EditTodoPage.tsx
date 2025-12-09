import { useParams } from "react-router-dom";
import TodoForm from "../components/TodoForm";

export default function EditTodoPage() {
    const { id } = useParams();

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Todo</h2>
            <TodoForm editId={id} />
        </div>
    );
}
