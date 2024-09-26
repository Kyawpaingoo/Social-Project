import { Request, Response } from "express";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import prisma from "../prisma/prisma";
import dotenv from 'dotenv';
import { jwtpayload } from "../Types/User";

dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET as string

export const GetAll = async (req: Request, res: Response): Promise<void> =>{
    const data: User[] | null = await prisma.user.findMany({
        include: {
            post: true, 
            comments: true
        },
        orderBy: {
            id: "desc"
        },
        take: 20
    })

    if(data.length == 0 || data == null)
    {
        res.json('NO data found');
    }

    res.json(data);
}

export const GetByID = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const data: User | null = await prisma.user.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            post: true, 
            comments: true,
            followers: true,
            follwoing: true,
        }
    });

    if(data == null)
    {
        res.json('No data found.')
    }
    res.json(data);
}

export const Create = async (req: Request, res: Response): Promise<void> => {
    const {name, username, bio, password} = req.body;
    if(!name || !username || !password) 
    {
        res.status(400).json({msg: "name, username, password required"});
        return;
    }

    const hash = await bcrypt.hash(password, 10);
    const user: User | null = await prisma.user.create({
        data: {
            name,
            username,
            password: hash,
            bio
        }
    })
    if(user == null)
    {
        res.json('Fail');
    }
    res.json(user);
}

export const Login = async (req: Request, res: Response): Promise<Response<Record<string, any>>>=>{
    const {username, password} = req.body;

    if(!username || !password)
    {
        return res.status(400).json({msg: 'username and password required'});
    }

    const user =await prisma.user.findUnique({
        where: {username}
    });

    if(user) {
        const userpayload: jwtpayload = {
            id: user.id,
            name: user.name,
            password: user.password
        }
        if(bcrypt.compareSync(password, user.password))
        {
            const token = generateToken(userpayload);
            return res.json({token, user});
        }
    }

    return res.status(401).json({ msg: "incorrect username or password" });
}

export const Verify = async(req:Request, res: Response) => {
    try {
        const user = res.locals.user;
        
        res.json(user);
    }
    catch(e)
    {
        console.log("Error message: ", e);
    }
    
}

const generateToken = (payload: any) => {
    
    if(!jwtSecret){
        throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(payload, jwtSecret, {expiresIn: '1h'});
    return token;
}