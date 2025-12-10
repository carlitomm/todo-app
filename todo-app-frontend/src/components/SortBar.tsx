import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../store/slices/todoSlice";
import { ClockIcon, CalendarDaysIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import type { RootState } from "../store/store";

export default function SortBar() {
    const dispatch = useDispatch();
    const sort = useSelector((state: RootState) => state.todos.sort);

    const options = [
        { id: "created", label: "Created", icon: ClockIcon },
        { id: "due", label: "Due Date", icon: CalendarDaysIcon }
    ];

    return (
        <div className="flex gap-6 justify-center mt-3 items-center">
            <ArrowsUpDownIcon className="h-4 w-4" />
            {options.map((opt) => {
                const Icon = opt.icon;

                return (
                    <button
                        key={opt.id}
                        onClick={() => dispatch(setSort(opt.id as any))}
                        className={`
              relative pb-1 font-medium flex items-center gap-1 transition
              text-gray-600 hover:text-purple-500
              ${sort === opt.id ? "text-purple-600" : ""}
            `}
                    >
                        <Icon className="h-4 w-4" />
                        {opt.label}

                        {sort === opt.id && (
                            <span className="absolute left-0 right-0 -bottom-1 mx-auto h-[2px] w-full bg-purple-600 rounded-full"></span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
