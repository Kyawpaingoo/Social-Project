import { Comment, Post, User } from "@prisma/client"

export type CommentDetail = {
    comment: Comment,
    user?: User | null
}

export type LikeCommentResponse = {
    id: number,
    commentId: number,
    userId: number,
}

export type CommentAuth = {
    comment: Comment,
    post?: Post
}