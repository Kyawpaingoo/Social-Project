
import express, {Request, Response}  from "express";
import cors from 'cors';
import prisma from "./prisma";
import ContentRouter from "./Routers/ContentRouter";
const app = express();
app.use(cors());

app.get('/info', (req: Request, res: Response)=>{
    res.json({msg: 'Social API'});
});

app.use("/api/content", ContentRouter);

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