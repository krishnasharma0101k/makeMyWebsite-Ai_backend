import express from "express"

import isauth from "../middlewares/auth.middleware.js"
import { generateWebsite, getWebsiteById, change,
    getAllWebsites,
    deploy,
    getBySlug
 } from "../controllers/website.controller.js"

const websiteRouter = express.Router()

websiteRouter.post("/generate", isauth, generateWebsite)
websiteRouter.post("/update/:id", isauth, change)
websiteRouter.get("/get-by-id/:id", isauth, getWebsiteById)
websiteRouter.get("/get-all", isauth, getAllWebsites)
websiteRouter.get("/deploy/:id", isauth, deploy)
websiteRouter.get("/get-by-slug/:slug", isauth, getBySlug)

export default websiteRouter