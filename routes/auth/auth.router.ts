import { Router } from 'express';

import { registerUserRoute, loginUserRoute, logoutUserRoute, getUserData } from './auth.routes';
import { userAuth } from '../../middlewares';

const authRouter = Router();

// Auth routes
authRouter.post('/register', registerUserRoute);
authRouter.post('/login', loginUserRoute);
authRouter.post('/logout', logoutUserRoute);
authRouter.get('/user', userAuth, getUserData);

export { authRouter };
