import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITodo } from "../../types/todo";
import type { RootState } from "../store";
import { api } from "../../services/api";

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

/** SLICES */
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoApi.fulfilled, (state, action) => {
                const index = state.todos.findIndex(t => t.id === action.payload.id);
                if (index !== -1) state.todos[index] = action.payload;
            })
            .addCase(deleteTodoApi.fulfilled, (state, action) => {
                state.todos = state.todos.filter(t => t.id !== action.payload);
            });
    }
});

/** SELECTORS */
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

/** THUNKS */
export const fetchTodos = createAsyncThunk("todos/fetch", async () => {
    const res = await api.get("/todos");
    return res.data as ITodo[];
})

export const createTodo = createAsyncThunk(
    "todos/create",
    async (todo: ITodo) => {
        const res = await api.post("/todos", todo);
        return res.data as ITodo;
    }
);

export const updateTodoApi = createAsyncThunk<ITodo, ITodo>(
    "todos/update",
    async (todo: ITodo) => {
        const res = await api.put(`/todos/${todo.id}`, todo);
        return res.data as ITodo;
    }
);

export const deleteTodoApi = createAsyncThunk<string, string>(
    "todos/delete",
    async (id: string) => {
        await api.delete(`/todos/${id}`);
        return id;
    }
);

export const { setFilter, setSort, addTodo, deleteTodo, toggleComplete, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;