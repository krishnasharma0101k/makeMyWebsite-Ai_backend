import express from "express"
import { getCurrentUser } from "../controllers/use.controllers.js"
import isauth from "../middlewares/auth.middleware.js"


const userRouter = express.Router()

userRouter.get("/me", isauth, getCurrentUser)

export default userRouter