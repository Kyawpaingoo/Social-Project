import { User, UserType } from "./User"

export type PostCommentType = {
    id: number,
    content: string,
    userId: number,
    postId: number,
    created: string,
    isDeleted: boolean,
    user: User,
    likes: CommentLike[],
}

export type Comment = {
    id: number,
    content: string,
    userId: number,
    postId: number,
    created: string,
    isDeleted: boolean,
}

export type CommentDetail = {
    comment: Comment
    user?: UserType | null
}

export type CommentLike = {
  id: number
  commentId: number
  user: User,
  userId: number 
  created: string
}

