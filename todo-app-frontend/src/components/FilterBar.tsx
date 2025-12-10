import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setFilter } from "../store/slices/todoSlice";
import { Bars3Icon, ClockIcon, CheckIcon } from "@heroicons/react/24/outline";
import { FunnelIcon } from "@heroicons/react/24/outline";

export default function FilterBar() {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.todos.filter);

    const options = [
        { id: "all", label: "All", icon: Bars3Icon },
        { id: "active", label: "Active", icon: ClockIcon },
        { id: "completed", label: "Completed", icon: CheckIcon }
    ];

    return (
        <div className="flex gap-6 justify-center items-center">
            <FunnelIcon className="h-4 w-4" />
            {options.map(opt => {

                const Icon = opt.icon;

                return (<button
                    key={opt.id}
                    onClick={() => dispatch(setFilter(opt.id as any))}
                    className={`relative font-medium transition text-gray-600 hover:text-blue-500 flex items-center gap-1
                        ${filter === opt.id ? "text-blue-600" : ""}
                    `}
                >
                    <Icon className="h-4 w-4" />
                    {opt.label}
                    {filter === opt.id && (
                        <span className="absolute left-0 right-0 -bottom-1 mx-auto h-[2px] w-full bg-blue-600 rounded-full"></span>
                    )}
                </button>)
            })}
        </div>
    );
}
