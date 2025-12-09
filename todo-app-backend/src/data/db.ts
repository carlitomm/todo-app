import { Todo } from "../models/todo";
import { Category } from "../models/category";

export const db = {
    todos: [] as Todo[],
    categories: [] as Category[],
};