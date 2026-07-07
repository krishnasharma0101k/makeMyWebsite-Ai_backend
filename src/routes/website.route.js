import express from "express"

import isauth from "../middlewares/auth.middleware.js"
import { generateWebsite, getWebsiteById } from "../controllers/website.controller.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isauth, generateWebsite)
websiteRouter.get("/get-by-id/:id", isauth, getWebsiteById)

export default websiteRouter