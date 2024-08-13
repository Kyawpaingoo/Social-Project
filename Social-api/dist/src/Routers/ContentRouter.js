"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContentController_1 = require("../Controllers/ContentController");
const ContentRouter = express_1.default.Router();
ContentRouter.get("/posts", ContentController_1.GetByList);
ContentRouter.get('/posts/:id', ContentController_1.GetByID);
exports.default = ContentRouter;
