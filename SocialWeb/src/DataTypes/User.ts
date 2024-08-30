import { PostListType } from "./Post";

export type User = {
    id: number;
    name: string;
    username: string;
    bio: string | null;
    password: string;
    created: Date;
    isDeleted: boolean;
    post: PostListType[];
}

export type LoginType = {
    token: string,
    user: UserType;
}

export type UserType = {
    id: number;
    name: string;
    username: string;
    bio: string | null;
    password: string;
    created: Date;
    isDeleted: boolean;
}

export type RegisterType = Omit<UserType, 'id' | 'created' | 'isDeleted' >;