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
exports.LikePostList = exports.UnlikePost = exports.LikePost = exports.Delete = exports.GetByID = exports.GetByList = exports.Create = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ msg: 'content required' });
        return;
    }
    const user = res.locals.user;
    const post = yield prisma_1.default.post.create({
        data: {
            content,
            userId: user.id
        }
    });
    const data = yield prisma_1.default.post.findUnique({
        where: {
            id: Number(post.id)
        },
        include: {
            user: true,
            comments: {
                include: { user: true }
            }
        }
    });
    res.json(data);
});
exports.Create = Create;
const GetByList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.post.findMany({
            include: {
                user: true,
                comments: {
                    where: {
                        isDeleted: false,
                    }
                },
                likes: true
            },
            where: {
                isDeleted: false,
            },
            orderBy: {
                id: "desc",
            },
            take: 20
        });
        setTimeout(() => {
            res.json(data);
        }, 2000);
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
});
exports.GetByList = GetByList;
const GetByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.post.findFirst({
            include: {
                user: true,
                likes: true,
                comments: {
                    where: {
                        isDeleted: false,
                    },
                    include: {
                        user: true,
                        likes: true,
                    }
                }
            },
            where: {
                id: Number(id)
            }
        });
        if (data == null) {
            res.json('Post not found.');
        }
        res.json(data);
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
});
exports.GetByID = GetByID;
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.comment.updateMany({
            data: {
                isDeleted: true
            },
            where: {
                postId: Number(id)
            }
        });
        yield prisma_1.default.post.update({
            data: {
                isDeleted: true
            },
            where: {
                id: Number(id)
            }
        });
        res.sendStatus(204);
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
});
exports.Delete = Delete;
const LikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = res.locals.user;
    const like = yield prisma_1.default.postLike.create({
        data: {
            postId: Number(id),
            userId: Number(user.id),
        }
    });
    res.json({ like });
});
exports.LikePost = LikePost;
const UnlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = res.locals.user;
    yield prisma_1.default.postLike.deleteMany({
        where: {
            postId: Number(id),
            userId: Number(user.id)
        }
    });
    res.json({ msg: `Unlike post ${id}` });
});
exports.UnlikePost = UnlikePost;
const LikePostList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prisma_1.default.postLike.findMany({
        where: {
            postId: Number(id)
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
exports.LikePostList = LikePostList;
