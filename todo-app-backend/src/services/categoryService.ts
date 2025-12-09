import { db } from "../data/db";
import { Category } from "../models/category";

export const categoryService = {
    getAll: () => db.categories,

    create: (category: Category) => {
        db.categories.push(category);
        return category;
    }
};
