import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";


interface TodoState {
    todos: ITodo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
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

export const { addTodo, deleteTodo, toggleComplete, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;