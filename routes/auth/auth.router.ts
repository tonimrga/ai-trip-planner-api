import { Router } from 'express';

import { registerUserRoute, loginUserRoute, logoutUserRoute } from './auth.routes';

const authRouter = Router();

// Auth routes
authRouter.post('/register', registerUserRoute);
authRouter.post('/login', loginUserRoute);
authRouter.post('/logout', logoutUserRoute);

export { authRouter };
