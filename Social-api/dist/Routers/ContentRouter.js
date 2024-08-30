"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContentController_1 = require("../Controllers/ContentController");
const auth_1 = require("../Middlewares/auth");
const ContentRouter = express_1.default.Router();
ContentRouter.post("/posts", auth_1.auth, ContentController_1.Create);
ContentRouter.get("/posts", ContentController_1.GetByList);
ContentRouter.get('/posts/:id', ContentController_1.GetByID);
ContentRouter.put('/posts/delete/:id', auth_1.auth, (0, auth_1.isOwner)("post"), ContentController_1.Delete);
ContentRouter.post('/like/posts/:id', auth_1.auth, ContentController_1.LikePost);
ContentRouter.delete('/unlike/posts/:id', auth_1.auth, ContentController_1.UnlikePost);
ContentRouter.get('/like/posts/:id', ContentController_1.LikePostList);
exports.default = ContentRouter;
