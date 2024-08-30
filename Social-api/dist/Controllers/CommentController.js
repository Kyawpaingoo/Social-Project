"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeCommentList = exports.UnlikeComment = exports.LikeComment = exports.Delete = exports.Create = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, postId } = req.body;
    if (!content || !postId) {
        res.status(400).json({
            msg: "content and postId required"
        });
        return;
    }
    const user = res.locals.user;
    const comment = yield prisma_1.default.comment.create({
        data: {
            content,
            userId: Number(user.id),
            postId: Number(postId)
        }
    });
    const commentDetail = {
        comment: Object.assign({}, comment),
        user: user
    };
    res.json(commentDetail);
});
exports.Create = Create;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.comment.delete({
            where: {
                id: Number(id)
            }
        });
        res.json({ message: "Comment Deleted" }).status(204);
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
});
exports.Delete = Delete;
const LikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = res.locals.user;
    const like = yield prisma_1.default.commentLike.create({
        data: {
            commentId: Number(id),
            userId: Number(user.id)
        }
    });
    res.json({ like });
});
exports.LikeComment = LikeComment;
const UnlikeComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = res.locals.user;
    // console.log(user);
    yield prisma_1.default.commentLike.deleteMany({
        where: {
            commentId: Number(id),
            userId: Number(user.id)
        }
    });
    res.json({ msg: `Unlike comment ${id}` });
});
exports.UnlikeComment = UnlikeComment;
const LikeCommentList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prisma_1.default.commentLike.findMany({
        where: {
            commentId: Number(id)
        },
        include: {
            user: {
                include: {
                    followers: true,
                    follwoing: true
                }
            }
        }
    });
    res.json(data);
});
exports.LikeCommentList = LikeCommentList;
