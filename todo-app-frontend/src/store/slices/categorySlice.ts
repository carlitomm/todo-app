import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { ICategory } from "../../types/category";

interface CategoryState {
    categories: ICategory[];
}

const initialState: CategoryState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload);
        },
    },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
