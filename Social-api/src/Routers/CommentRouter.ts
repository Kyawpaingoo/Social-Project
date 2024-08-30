import express from 'express';
import { auth, isOwner } from '../Middlewares/auth';
import { Create, Delete, LikeComment, LikeCommentList, UnlikeComment } from '../Controllers/CommentController';

const CommentRouter = express.Router();

CommentRouter.post('/', auth, Create);
CommentRouter.delete('/delete/:id', auth, isOwner("comment"), Delete);
CommentRouter.post('/like/comment/:id', auth, LikeComment);
CommentRouter.delete('/unlike/comment/:id', auth, UnlikeComment);
CommentRouter.get('/like/comments/:id', LikeCommentList);

export default CommentRouter;