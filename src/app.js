import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//below 3 lines are major configuurations(kaafi kaam ki hain yeh)
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import

import userRouter from './routes/user.routes.js'


//routes declaration 
app.use("/api/v1/users",userRouter)

// ek baar users pe direct kardiya uske aage routes waali file mein aage direct ho jaayega jesa:-> http://localhost:8000/api/v1/users/register
export { app };