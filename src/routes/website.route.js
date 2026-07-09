import express from "express"

import isauth from "../middlewares/auth.middleware.js"
import { generateWebsite, getWebsiteById, change,
    getAllWebsites
 } from "../controllers/website.controller.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isauth, generateWebsite)
websiteRouter.post("/update/:id", isauth, change)
websiteRouter.get("/get-by-id/:id", isauth, getWebsiteById)
websiteRouter.get("/get-all", isauth, getAllWebsites)

export default websiteRouter