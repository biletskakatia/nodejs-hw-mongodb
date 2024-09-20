import { Router } from "express";

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { userRegisterSchema, userLoginSchema } from "../validation/users.js";

import { registerController, loginController, refreshController, logoutController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userRegisterSchema), ctrlWrapper(registerController));

authRouter.post("/login", validateBody(userLoginSchema), ctrlWrapper(loginController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post("/logout", ctrlWrapper(logoutController));


export default authRouter;