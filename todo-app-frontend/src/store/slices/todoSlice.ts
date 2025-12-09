import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";
import type { RootState } from "../store";


interface TodoState {
    todos: ITodo[];
    filter: "all" | "active" | "completed";
    sort: "created" | "due";
}

const initialState: TodoState = {
    todos: [],
    filter: "all",
    sort: "created",
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
            state.filter = action.payload;
        },
        setSort: (state, action: PayloadAction<"created" | "due">) => {
            state.sort = action.payload;
        },
        addTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            const index = state.todos.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.todos[index] = action.payload;
        },
    },
});

export const selectProcessedTodos = (state: RootState) => {
    const { todos, filter, sort } = state.todos;

    let list = [...todos];

    if (filter === "active") list = list.filter(t => !t.completed);
    if (filter === "completed") list = list.filter(t => t.completed);

    list.sort((a, b) => {
        if (sort === "due") {
            return (a.dueDate ? new Date(a.dueDate).getTime() : Infinity)
                - (b.dueDate ? new Date(b.dueDate).getTime() : Infinity);
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return list;
};

export const { setFilter, setSort, addTodo, deleteTodo, toggleComplete, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;