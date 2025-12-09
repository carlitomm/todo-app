import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        categories: categoryReducer,
    },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;