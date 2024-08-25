import express from 'express'
import { isAuth } from '../middleware/verifyToken.js'
import { getUserForSidebar } from '../controller/user.controller.js'

const router = express.Router()

router.get("/", isAuth, getUserForSidebar)

export default router