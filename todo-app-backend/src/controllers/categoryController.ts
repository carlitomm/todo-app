import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = {
    getAll: (req: Request, res: Response) => {
        res.json(categoryService.getAll());
    },

    create: (req: Request, res: Response) => {
        const category = req.body;
        const created = categoryService.create(category);
        res.status(201).json(created);
    }
};
