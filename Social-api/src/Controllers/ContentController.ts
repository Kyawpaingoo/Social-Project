import { Request, Response } from "express";

import prisma from '../prisma';
import { Post } from '@prisma/client';
import { error } from "console";

export const GetByList = async(req: Request, res: Response)=>{
    try{
        const data: Post[] = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            where: {
                isDeleted: !true
            },
            orderBy: {
                id: "desc",
            },
            take: 20
        });
        res.json(data);
    }
    catch(e){
        res.status(500).json({
            error: e
        });
    }
}

export const GetByID = async(req: Request, res: Response)=>{
    const { id } = req.params;

    try{
        const data: Post | null = await prisma.post.findFirst({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    }
                }
            },
            where: {
                id: Number(id)
            }
        });
        if(data == null)
        {
            res.json('Post not found.');
        }
        res.json(data);
    }
    catch(e)
    {
        res.status(500).json(
            {
                error: e
            }
        );
    }
}

