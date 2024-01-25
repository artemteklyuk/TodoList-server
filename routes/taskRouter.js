import Router from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import tasksController from "../controllers/tasksController.js";
const router = new Router()

router.post("/", authMiddleware, tasksController.create)
router.get("/", tasksController.getById)
router.put('/', tasksController.updateOne)
router.delete("/", tasksController.delete)



export default router