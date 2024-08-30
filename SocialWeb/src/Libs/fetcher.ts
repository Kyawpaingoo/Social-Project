import axios from "axios";
import { LoginType, RegisterType, User } from "../DataTypes/User";
import { PostListType } from "../DataTypes/Post";
import { PostCommentType } from '../DataTypes/Comment';

export const postUser = async(data: RegisterType): Promise<User> =>{
   const res = await axios.post(`/user/users/create`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    if(res.status >= 200 && res.status <= 300) {
        return res.data;
    }

    throw new Error("Error: Check Network Log");
}

export const postLogin = async (username: string, password: string): Promise<LoginType> => {
    const data = JSON.stringify({username, password});
    const res = await axios.post(`/user/users/login`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    } );

    if(res.status >= 200 && res.status <= 300) {
        return res.data;
    }
    
    throw new Error("Incorrect username or password")
}

export const fetchUser = async (id: number): Promise<User> => {
    const token: string | null = getToken();
    const res = await axios.get(`/user/users/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export const fetchVerify = async(): Promise<User | null> => {
    const token: string | null = getToken();
    const res = await axios.get(`/user/users/verify`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    if(res.status >= 200 && res.status <= 300) 
    {
        return res.data as User;
    }
    return null;
}

export const postContent = async(content: string): Promise<PostListType> => {
    const token:string | null = getToken();
    const data = JSON.stringify({content});
    const res = await axios.post("/content/posts", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    
    if(res.status >= 200 && res.status <= 300) 
    {
        return res.data as PostListType;
    }

    throw new Error("Error: Check Network Log");
}

export const postComment = async(content: string, postId: number): Promise<PostCommentType> => {
    const token = getToken();
    const data = JSON.stringify({content, postId})
    const res = await axios.post("/comment/", data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    console.log(res.data);
    if(res.status >= 200 && res.status <= 300)
    {
        return res.data
    }

    throw new Error("Error: Check Network Log");
}

export const postContentLike = async (id: number) => {
    const token: string | null = getToken();
    const res = await axios.post(`/content/like/posts/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const postCommentLike = async (id: number) => {
    const token: string | null = getToken();
    const res = await axios.post(`/comment/like/comment/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const deletePostLike = async(id: number) => {
    const token: string | null = getToken();
    const res = await axios.delete(`/content/unlike/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const deleteCommentLike = async(id: number) => {
    const token: string | null = getToken();
    const res = await axios.delete(`/comment/unlike/comment/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export const fetchPostLikes = async(id: number) => {
    console.log(id);
    const res = await axios.get(`/content/like/posts/${id}`);
    return res.data;
}

export const fetchCommentLikes = async(id: number) => {
    const res = await axios.get(`/comment/like/comments/${id}`);
    return res.data;
}

const getToken = (): string | null=>{
    const token: string | null = localStorage.getItem("token");
    return token;
}

export const fetchComment = async(id: number)=>{
    const res = await axios.get(`/content/posts/${id}`);
    return res.data
}

export const RemoveComment = async(id: number)=>{
    const token = getToken();
    const res = await axios.delete(`/comment/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.statusText
}