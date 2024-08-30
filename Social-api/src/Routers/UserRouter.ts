import express from "express";
import { Create, GetAll, GetByID, Login, Verify } from "../Controllers/UserController";
import { auth } from "../Middlewares/auth";

const UserRouter = express.Router();

UserRouter.get('/users/verify', auth, Verify);
UserRouter.get("/users", GetAll);
UserRouter.get("/users/:id", GetByID);
UserRouter.post('/users/create', Create);
UserRouter.post('/users/login', Login);


export default UserRouter;