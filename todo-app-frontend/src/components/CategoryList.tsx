import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { ICategory } from "../types/category";

export default function CategoryList() {
    const categories = useSelector((state: RootState) => state.categories.categories);

    return (
        <ul>
            {categories.map((c: ICategory) => (
                <li key={c.id}>{c.name}</li>
            ))}
        </ul>
    );
}
