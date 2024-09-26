import dotenv from 'dotenv';
import express, {Request, Response}  from "express";
import cors, { CorsOptions } from 'cors';
import prisma from "./prisma/prisma";
import ContentRouter from "./Routers/ContentRouter";
import UserRouter from "./Routers/UserRouter";
import CommentRouter from "./Routers/CommentRouter";
import FollowRouter from './Routers/FollowController';

dotenv.config();

const app = express();

const allowedOrigin = ['http://localhost:3000'];

type CorsOptionsCallback = (err: Error | null, allow?: boolean) => void;
const corsOptions: CorsOptions = {
    origin: function(origin: string | undefined, callback: CorsOptionsCallback) {
        if(!origin || allowedOrigin.includes(origin)){
            callback(null, true)
        } else {
             callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded(
    {
        extended: true
    })
);


app.get('/info', (req: Request, res: Response)=>{
    res.json({msg: 'Social API'});
});

app.use("/api/content", ContentRouter);
app.use("/api/user", UserRouter);
app.use('/api/comment', CommentRouter);
app.use('/api/follow', FollowRouter);

const server = app.listen(8000, ()=>{
    console.log('Social API started at 8000...');
})

const gracfulShutdown = async ()=>{
    await prisma.$disconnect();
    server.close(()=>{
        console.log("Social API closed.");
        process.exit(0);
    })
}

process.on("SIGTERM", gracfulShutdown);
process.on("SIGINT", gracfulShutdown);