import { createAsyncThunk, createSlice, type PayloadAction, } from "@reduxjs/toolkit";
import type { ICategory } from "../../types/category";
import { api } from "../../services/api";

interface CategoryState {
    categories: ICategory[];
}

const initialState: CategoryState = {
    categories: [],
};

/** SLICES */
const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            });
    }
});


/** THUNKS */
export const fetchCategories = createAsyncThunk<
    ICategory[],
    void,
    { rejectValue: string }
>(
    "categories/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/categories");
            return res.data as ICategory[];
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch categories";

            return rejectWithValue(message);
        }
    }
);

export const createCategory = createAsyncThunk<
    ICategory,
    ICategory,
    { rejectValue: string }
>(
    "categories/create",
    async (category, { rejectWithValue }) => {
        try {
            const res = await api.post("/categories", category);
            return res.data as ICategory;
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Failed to create category";

            return rejectWithValue(message);
        }
    }
);

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
