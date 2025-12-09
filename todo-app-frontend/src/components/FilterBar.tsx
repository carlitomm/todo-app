import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setFilter } from "../store/slices/todoSlice";

export default function FilterBar() {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.todos.filter);

    const options = [
        { id: "all", label: "All" },
        { id: "active", label: "Active" },
        { id: "completed", label: "Completed" }
    ];

    return (
        <div className="flex gap-3 mt-6">
            {options.map(opt => (
                <button
                    key={opt.id}
                    onClick={() => dispatch(setFilter(opt.id as any))}
                    className={`
            px-4 py-2 rounded-lg font-medium border
            ${filter === opt.id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 hover:bg-gray-100"}
          `}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
