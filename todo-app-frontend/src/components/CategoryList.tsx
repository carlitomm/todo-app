import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function CategoryList() {
    const categories = useSelector((state: RootState) => state.categories.categories);

    return (
        <ul>
            {categories.map((c: any) => (
                <li key={c.id}>{c.name}</li>
            ))}
        </ul>
    );
}
