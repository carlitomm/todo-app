import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setSort } from "../store/slices/todoSlice";

export default function SortBar() {
    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.todos.sort);

    const options = [
        { id: "created", label: "Created Date" },
        { id: "due", label: "Due Date" }
    ];

    return (
        <div className="flex gap-3 mt-3">
            {options.map(opt => (
                <button
                    key={opt.id}
                    onClick={() => dispatch(setSort(opt.id as any))}
                    className={`
            px-4 py-2 rounded-lg border font-medium
            ${sort === opt.id
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 hover:bg-gray-100"}
          `}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
