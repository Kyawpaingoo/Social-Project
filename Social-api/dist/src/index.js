"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = __importDefault(require("./prisma"));
const ContentRouter_1 = __importDefault(require("./Routers/ContentRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/info', (req, res) => {
    res.json({ msg: 'Social API' });
});
app.use("/api/content", ContentRouter_1.default);
const server = app.listen(8000, () => {
    console.log('Social API started at 8000...');
});
const gracfulShutdown = async () => {
    await prisma_1.default.$disconnect();
    server.close(() => {
        console.log("Social API closed.");
        process.exit(0);
    });
};
process.on("SIGTERM", gracfulShutdown);
process.on("SIGINT", gracfulShutdown);
