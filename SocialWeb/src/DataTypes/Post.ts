import { PostCommentType } from "./Comment";
import { User, UserType } from "./User";

export type PostListType = {
    id: number;
    content: string;
    userId: number;
    created: string;
    isDeleted: boolean;
    user: User;
    likes: PostLike[]
    comments: PostCommentType[];
};

export type Post = {
    id: number;
    content: string;
    userId: number;
    created: string;
    isDeleted: boolean;
}

export type PostLike =  {
  id: number
  //post: PostListType
  postId: number 
  user: UserType
  userId: number 
  created: string
}

