require('dotenv').config()
import express, { NextFunction ,Request, Response} from 'express'
export const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {ErrorMiddleware} from './middleware/error';
app.use(express.json({limit:"50mb"}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.ORIGIN
}))

//TESTING API
app.get('/test',(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
success:"true",
message:"API is working"
    })
})


//unknown route 
app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 400;
    next(err)
})
app.use(ErrorMiddleware)


