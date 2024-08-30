import express from 'express';
import { Create, Delete, GetByID, GetByList, LikePost, LikePostList, UnlikePost } from '../Controllers/ContentController';
import { auth, isOwner } from '../Middlewares/auth';

const ContentRouter = express.Router();

ContentRouter.post("/posts", auth, Create);
ContentRouter.get("/posts", GetByList);
ContentRouter.get('/posts/:id', GetByID);
ContentRouter.put('/posts/delete/:id', auth, isOwner("post"), Delete);
ContentRouter.post('/like/posts/:id', auth, LikePost);
ContentRouter.delete('/unlike/posts/:id', auth, UnlikePost);
ContentRouter.get('/like/posts/:id', LikePostList);
export default ContentRouter;