"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByID = exports.GetByList = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const GetByList = async (req, res) => {
    try {
        const data = await prisma_1.default.post.findMany({
            include: {
                user: true,
                comments: true
            },
            where: {
                isDeleted: !true
            },
            orderBy: {
                id: "desc",
            },
            take: 20
        });
        res.json(data);
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
};
exports.GetByList = GetByList;
const GetByID = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma_1.default.post.findFirst({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
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
};
exports.GetByID = GetByID;
