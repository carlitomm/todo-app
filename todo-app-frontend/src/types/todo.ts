export interface ITodo {
    id: string;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    categoryId?: string;
    createdAt: string;
}