import { Router } from "express";
import { todoController } from "./controllers/todoController";
import { categoryController } from "./controllers/categoryController";

const router = Router();

router.get("/todos", todoController.getAll);
router.get("/todos/:id", todoController.getById);
router.post("/todos", todoController.create);
router.put("/todos/:id", todoController.update);
router.delete("/todos/:id", todoController.delete);


router.get("/categories", categoryController.getAll);
router.post("/categories", categoryController.create);

export default router;