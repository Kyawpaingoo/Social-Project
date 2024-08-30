"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../Middlewares/auth");
const CommentController_1 = require("../Controllers/CommentController");
const CommentRouter = express_1.default.Router();
CommentRouter.post('/', auth_1.auth, CommentController_1.Create);
CommentRouter.delete('/delete/:id', auth_1.auth, (0, auth_1.isOwner)("comment"), CommentController_1.Delete);
CommentRouter.post('/like/comment/:id', auth_1.auth, CommentController_1.LikeComment);
CommentRouter.delete('/unlike/comment/:id', auth_1.auth, CommentController_1.UnlikeComment);
CommentRouter.get('/like/comments/:id', CommentController_1.LikeCommentList);
exports.default = CommentRouter;
