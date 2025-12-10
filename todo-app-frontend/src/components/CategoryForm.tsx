import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addCategory } from "../store/slices/categorySlice";

export default function CategoryForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategory({ id: uuidv4(), name }));
        setName("");
    };

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button>Add Category</button>
        </form>
    );
}
