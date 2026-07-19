import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { stripeWebhook } from "./controllers/stripeWebHook.controller.js"
const app = express()
app.post("/api/stripe/wenhook", express.raw({type: "application"}), stripeWebhook)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))
app.use(cookieParser())

import authRouter from "./routes/auth.Route.js"
import userRouter from "./routes/user.route.js"
import websiteRouter from "./routes/website.route.js"
import billingRouter from "./routes/billing.route.js"

// routs declaration
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/website", websiteRouter)
app.use("/api/billing", billingRouter)

export { app }

