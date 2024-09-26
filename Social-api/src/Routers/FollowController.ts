import express from 'express';
import { followUser, unfollowUser } from '../Controllers/FollowController';
import { auth } from '../Middlewares/auth';

const FollowRouter = express.Router();

FollowRouter.post('/follow/:id', auth, followUser);
FollowRouter.delete('/unfollow/:id', auth, unfollowUser);

export default FollowRouter;