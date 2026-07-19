import express from "express"

import isauth from "../middlewares/auth.middleware.js"
import { billing } from "../controllers/billing.controller.js"  


const billingRouter = express.Router()

billingRouter.post("/", isauth, billing)

export default billingRouter