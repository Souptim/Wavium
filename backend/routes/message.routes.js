import express from 'express'
import { isAuth } from '../middleware/verifyToken.js'
import { getMessage, sendMessage } from '../controller/message.controller.js'

const router = express.Router()

router.get("/:id", isAuth, getMessage)  
router.post("/send/:id", isAuth, sendMessage)

export default router