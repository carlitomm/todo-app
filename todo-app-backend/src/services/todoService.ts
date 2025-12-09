import { db } from "../data/db";
import { Todo } from "../models/todo";

export const todoService = {
    getAll: () => db.todos,

    getById: (id: string) => db.todos.find(t => t.id === id),

    create: (todo: Todo) => {
        db.todos.push(todo);
        return todo;
    },

    update: (id: string, updated: Partial<Todo>) => {
        const index = db.todos.findIndex(t => t.id === id);
        if (index === -1) return null;

        db.todos[index] = { ...db.todos[index], ...updated };
        return db.todos[index];
    },

    delete: (id: string) => {
        const index = db.todos.findIndex(t => t.id === id);
        if (index === -1) return false;

        db.todos.splice(index, 1);
        return true;
    }
};
