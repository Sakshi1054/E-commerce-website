import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv';
import authRouter from "./routes/auth/auth.routes.js"

const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

dotenv.config({
    path: './.env'
});
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
// /api/auth/register  => registerUser


export {app};