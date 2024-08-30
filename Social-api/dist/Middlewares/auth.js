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
exports.isOwner = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
        return res.status(400).json({ msg: 'token required' });
    }
    const user = jsonwebtoken_1.default.verify(token, jwtSecret);
    if (!user) {
        return res.status(401).json({ msg: "inccorrect token" });
    }
    res.locals.user = user;
    next();
};
exports.auth = auth;
const isOwner = (type) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const user = res.locals.user;
    if (type == 'post') {
        const post = yield prisma_1.default.post.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (post == null)
            return res.status(400).json({ msg: 'post not found.' });
        if (post.userId == user.Id)
            return next();
    }
    if (type == 'comment') {
        const comment = yield prisma_1.default.comment.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                post: true
            }
        });
        if (comment == null)
            return res.status(400).json({ msg: 'comment not found.' });
        const commentAuth = {
            comment: Object.assign({}, comment),
            post: (yield prisma_1.default.post.findUnique({
                where: {
                    id: comment.postId
                }
            })) || undefined
        };
        if (commentAuth.comment.userId == user.id || ((_a = commentAuth.post) === null || _a === void 0 ? void 0 : _a.userId) == user.id)
            return next();
        res.status(403).json({ msg: "Unauthorize to delete" });
    }
});
exports.isOwner = isOwner;
