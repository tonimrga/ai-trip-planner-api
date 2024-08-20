import { Router } from 'express';

import { registerUserRoute, loginUserRoute, logoutUserRoute } from "./index.js";

const authRouter = Router();

authRouter.post("/register", registerUserRoute);
authRouter.post("/login", loginUserRoute);
authRouter.post("/logout", logoutUserRoute);

export { authRouter };