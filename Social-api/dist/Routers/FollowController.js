"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FollowController_1 = require("../Controllers/FollowController");
const auth_1 = require("../Middlewares/auth");
const FollowRouter = express_1.default.Router();
FollowRouter.post('/follow/:id', auth_1.auth, FollowController_1.followUser);
FollowRouter.delete('/unfollow/:id', auth_1.auth, FollowController_1.unfollowUser);
exports.default = FollowRouter;
