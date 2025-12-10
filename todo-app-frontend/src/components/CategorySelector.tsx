import { useEffect, useRef, useState } from "react";
import { createCategory } from "../store/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import type { ICategory } from "../types/category";
import type { RootState } from "../store/store";

export default function CategorySelector({ value, onChange }: {
    value: string;
    onChange: (id: string) => void;
}) {

    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);

    const filteredCategories = categories.filter((c: ICategory) =>
        c.name.toLowerCase().includes(input.toLowerCase())
    );

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCreate = () => {
        if (!input.trim()) return;

        dispatch(createCategory({ name: input, id: uuidv4() })).then((res: any) => {
            const newCat = res.payload;
            onChange(newCat.id);
            setInput("");
            setOpen(false);
        });
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Category..."
                value={input || categories.find((c: any) => c.id === value)?.name || ""}
                onChange={(e) => {
                    setInput(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                className="border rounded-lg p-2 w-full"
            />

            {open && (
                <div ref={wrapperRef} className="absolute z-10 w-full bg-white shadow rounded-lg mt-1 max-h-40 overflow-auto border">

                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => {
                                    onChange(c.id);
                                    setInput("");
                                    setOpen(false);
                                }}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {c.name}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-gray-500">
                            No matches…
                        </div>
                    )}

                    {input && !filteredCategories.some((c) => c.name.toLowerCase() === input.toLowerCase()) && (
                        <div
                            onClick={handleCreate}
                            className="px-3 py-2 bg-blue-50 hover:bg-blue-100 cursor-pointer text-blue-600 font-medium border-t"
                        >
                            + Create “{input}”
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
