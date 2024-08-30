"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controllers/UserController");
const auth_1 = require("../Middlewares/auth");
const UserRouter = express_1.default.Router();
UserRouter.get('/users/verify', auth_1.auth, UserController_1.Verify);
UserRouter.get("/users", UserController_1.GetAll);
UserRouter.get("/users/:id", UserController_1.GetByID);
UserRouter.post('/users/create', UserController_1.Create);
UserRouter.post('/users/login', UserController_1.Login);
exports.default = UserRouter;
