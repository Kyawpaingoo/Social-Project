import {Request, Response} from 'express'
import prisma from '../prisma/prisma';
import { Comment } from '@prisma/client';
import { CommentDetail } from '../Types/Comment';

export const Create = async(req: Request, res: Response): Promise<void> => {
    const { content, postId } = req.body;

    if(!content || !postId)
    {
        res.status(400).json({
            msg: "content and postId required"
        });
        return;
    }

    const user = res.locals.user;

    const comment: Comment = await prisma.comment.create({
        data: {
            content,
            userId: Number(user.id),
            postId: Number(postId)
        }
    });

    const commentDetail: CommentDetail = {
        comment: {...comment},
        user: user
    }

    res.json(commentDetail);
}


export const Delete = async(req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    try{
        await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({message:"Comment Deleted"}).status(204);
    }
    catch(e){
        res.status(500).json({
            error: e
        })
    }   
}

export const LikeComment = async(req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = res.locals.user;

    const like = await prisma.commentLike.create({
        data: {
            commentId: Number(id),
            userId: Number(user.id)
        }
    });

    res.json({like})
}

export const UnlikeComment = async(req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = res.locals.user;

   // console.log(user);

    await prisma.commentLike.deleteMany({
        where: {
            commentId: Number(id),
            userId: Number(user.id)
        }
    })

    res.json({msg: `Unlike comment ${id}`})
}

export const LikeCommentList = async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    const data = await prisma.commentLike.findMany({
        where: {
            commentId: Number(id)
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