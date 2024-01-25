import Router from "express";
import userRouter from "./userRouter.js";
import listRouter from "./listRouter.js";
import taskRouter from "./taskRouter.js";

const router = new Router()

router.use("/user", userRouter)
router.use("/list", listRouter)
router.use("/task", taskRouter)


export default router