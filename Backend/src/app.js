const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const connectToDB = require("./config/database")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))

// Serverless Database Connection Middleware
app.use(async (req, res, next) => {
    await connectToDB();
    next();
})

app.get("/health", async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running"
    })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app