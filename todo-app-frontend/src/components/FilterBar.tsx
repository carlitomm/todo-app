import { useState } from "react";

export default function FilterBar() {
    const [filter, setFilter] = useState("all");

    return (
        <div style={{ marginBottom: "10px" }}>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
    );
}