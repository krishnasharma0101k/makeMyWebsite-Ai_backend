import express from "express"

import isauth from "../middlewares/auth.middleware.js"
import { generateWebsite } from "../controllers/website.controller.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isauth, generateWebsite)

export default websiteRouter