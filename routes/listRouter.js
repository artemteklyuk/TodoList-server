import Router from "express";
import listController from "../controllers/listController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router()

router.post("/", authMiddleware, listController.create)
router.get("/:userId", listController.getAll)
router.delete("/", authMiddleware, listController.delete)



export default router