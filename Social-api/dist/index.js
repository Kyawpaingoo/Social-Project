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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./prisma/prisma"));
const ContentRouter_1 = __importDefault(require("./Routers/ContentRouter"));
const UserRouter_1 = __importDefault(require("./Routers/UserRouter"));
const CommentRouter_1 = __importDefault(require("./Routers/CommentRouter"));
const FollowController_1 = __importDefault(require("./Routers/FollowController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigin = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.get('/info', (req, res) => {
    res.json({ msg: 'Social API' });
});
app.use("/api/content", ContentRouter_1.default);
app.use("/api/user", UserRouter_1.default);
app.use('/api/comment', CommentRouter_1.default);
app.use('/api/follow', FollowController_1.default);
const server = app.listen(8000, () => {
    console.log('Social API started at 8000...');
});
const gracfulShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
    server.close(() => {
        console.log("Social API closed.");
        process.exit(0);
    });
});
process.on("SIGTERM", gracfulShutdown);
process.on("SIGINT", gracfulShutdown);
