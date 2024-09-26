import { Request, Response } from "express";
import prisma from "../prisma/prisma";

export const followUser = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const { id } = req.params;

    const data = await prisma.follow.create({
        data: {
            followerId: Number(user.id),
            followingId: Number(id)
        }
    });

    res.json(data);
}

export const unfollowUser = async (req: Request, res: Response): Promise<void> => {
    const user = res.locals.user;
    const { id } = req.params;

    await prisma.follow.deleteMany({
        where: {
            followerId: Number(user.id),
            followingId: Number(id)
        }
    });

    res.json({msg: `Unfolow user ${id}`});
}