import { Request, Response } from "express";
import { todoService } from "../services/todoService";

export const todoController = {
    getAll: (req: Request, res: Response) => {
        res.json(todoService.getAll());
    },

    getById: (req: Request, res: Response) => {
        const todo = todoService.getById(req.params.id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.json(todo);
    },

    create: (req: Request, res: Response) => {
        const todo = req.body;
        const created = todoService.create(todo);
        res.status(201).json(created);
    },

    update: (req: Request, res: Response) => {
        const updated = todoService.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: "Todo not found" });
        res.json(updated);
    },

    delete: (req: Request, res: Response) => {
        const ok = todoService.delete(req.params.id);
        if (!ok) return res.status(404).json({ error: "Todo not found" });
        res.json({ success: true });
    }
};
