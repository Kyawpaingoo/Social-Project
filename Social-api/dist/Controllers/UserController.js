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
exports.Verify = exports.Login = exports.Create = exports.GetByID = exports.GetAll = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
const GetAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.user.findMany({
        include: {
            post: true,
            comments: true
        },
        orderBy: {
            id: "desc"
        },
        take: 20
    });
    if (data.length == 0 || data == null) {
        res.json('NO data found');
    }
    res.json(data);
});
exports.GetAll = GetAll;
const GetByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield prisma_1.default.user.findFirst({
        where: {
            id: Number(id)
        },
        include: {
            post: true,
            comments: true,
            followers: true,
            follwoing: true,
        }
    });
    if (data == null) {
        res.json('No data found.');
    }
    res.json(data);
});
exports.GetByID = GetByID;
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, bio, password } = req.body;
    if (!name || !username || !password) {
        res.status(400).json({ msg: "name, username, password required" });
        return;
    }
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({
        data: {
            name,
            username,
            password: hash,
            bio
        }
    });
    if (user == null) {
        res.json('Fail');
    }
    res.json(user);
});
exports.Create = Create;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: 'username and password required' });
    }
    const user = yield prisma_1.default.user.findUnique({
        where: { username }
    });
    if (user) {
        const userpayload = {
            id: user.id,
            name: user.name,
            password: user.password
        };
        if (bcryptjs_1.default.compareSync(password, user.password)) {
            const token = generateToken(userpayload);
            return res.json({ token, user });
        }
    }
    return res.status(401).json({ msg: "incorrect username or password" });
});
exports.Login = Login;
const Verify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        res.json(user);
    }
    catch (e) {
        console.log("Error message: ", e);
    }
});
exports.Verify = Verify;
const generateToken = (payload) => {
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' });
    return token;
};
