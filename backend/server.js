import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connected");
}).catch(err => console.error(err))

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
   res.send("hello")
});

//importing routes
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoute)

server.listen(PORT,() => {
    console.log(`Server listening to ${PORT}`);
})

//error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})