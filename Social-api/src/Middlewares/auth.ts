import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jwtpayload } from "../Types/User";
import prisma from "../prisma/prisma";
import { Comment, Post } from "@prisma/client";
import { CommentAuth, CommentDetail } from "../Types/Comment";

dotenv.config();
const jwtSecret: string | undefined = process.env.JWT_SECRET as string

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    const token: string | undefined = authorization && authorization.split(" ")[1];

    if(!token) {
        return res.status(400).json({msg: 'token required'});
    }

    const user = jwt.verify(token, jwtSecret) as jwtpayload;

    if(!user){
        return res.status(401).json({msg: "inccorrect token"});
    }

    res.locals.user = user;

    next();
}

export const isOwner = (type: string) => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = res.locals.user;

    if(type == 'post') 
    {
        const post: Post | null = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(post == null) return res.status(400).json({msg: 'post not found.'});

        if(post.userId == user.Id) return next();
    }

    if(type == 'comment') 
    {
        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                post: true
            }
        });

        if(comment == null) return res.status(400).json({msg: 'comment not found.'});

        const commentAuth: CommentAuth = {
            comment: {...comment},
            post: await prisma.post.findUnique({
                where: {
                    id: comment.postId
                }
            }) || undefined
        }

        if(commentAuth.comment.userId == user.id || commentAuth.post?.userId == user.id) return next();

        res.status(403).json({msg: "Unauthorize to delete"});
    }
}