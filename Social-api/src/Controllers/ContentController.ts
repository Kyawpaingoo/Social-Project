import { Request, Response } from "express";

import prisma from '../prisma/prisma';
import { Post } from '@prisma/client';

export const Create = async(req: Request, res: Response): Promise<void> => {
    const { content } = req.body;

    if(!content) {
        res.status(400).json({msg: 'content required'});
        return;
    }

    const user = res.locals.user;

    const post: Post = await prisma.post.create({
        data: {
            content,
            userId: user.id
        }
    });

    const data: Post | null = await prisma.post.findUnique({
        where: {
            id: Number(post.id)
        },
        include: {
            user: true,
            comments: {
                include: {user: true}
            }
        }
    })

    res.json(data);
}

export const GetByList = async(req: Request, res: Response): Promise<void> =>{
    try{
        const data: Post[] = await prisma.post.findMany({
            include: {
                user: true,
                comments: {
                    where: {
                        isDeleted: false,
                    }
                },
                likes: true
            },
            where: {
                isDeleted: false,
            },
            orderBy: {
                id: "desc",
            },
            take: 20
        });
        setTimeout(()=>{
            res.json(data);
        }, 2000);
        
    }
    catch(e){
        res.status(500).json({
            error: e
        });
    }
}

export const GetByID = async(req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;

    try{
        const data: Post | null = await prisma.post.findFirst({
            include: {
                user: true,
                likes: true,
                comments: {
                    where: {
                        isDeleted: false,
                    },
                    include: {
                        user: true,
                        likes: true,
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

export const Delete = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    try{
        await prisma.comment.updateMany({
            data: {
                isDeleted: true
            },
            where: {
                postId: Number(id)
            }
        });

        await prisma.post.update({
            data: {
                isDeleted: true
            },
            where: {
                id: Number(id)
            }
        });

        res.sendStatus(204);
    }
    catch(e)
    {
        res.status(500).json({
            error: e
        })
    }
}

export const LikePost = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = res.locals.user;

    const like = await prisma.postLike.create({
        data: {
            postId: Number(id),
            userId: Number(user.id),
        }
    })

    res.json({like});
}

export const UnlikePost = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = res.locals.user;

    await prisma.postLike.deleteMany({
        where: {
            postId: Number(id),
            userId: Number(user.id)
        }
    });
    res.json({msg: `Unlike post ${id}`});
}

export const LikePostList = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data = await prisma.postLike.findMany({
        where: {
            postId: Number(id)
        },
        include: {
            user: {
                include: {
                    followers: true,
                    follwoing: true
                }
            }
        }
    });

    res.json(data);
}