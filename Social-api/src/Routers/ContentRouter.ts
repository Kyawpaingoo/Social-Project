import express from 'express';
import { GetByID, GetByList } from '../Controllers/ContentController';

const ContentRouter = express.Router();

ContentRouter.get("/posts", GetByList);
ContentRouter.get('/posts/:id', GetByID);

export default ContentRouter;