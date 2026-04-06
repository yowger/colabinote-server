import { Router } from "express"

import * as boardsController from "./boards.controller"
import { asyncHandler } from "../../helpers/asyncHandler"

const router = Router()

router.get("/", asyncHandler(boardsController.getBoards))

router.post("/", asyncHandler(boardsController.createBoard))

router.patch("/:id", asyncHandler(boardsController.updateBoardTitle))

router.delete("/:id", asyncHandler(boardsController.deleteBoard))

export default router
