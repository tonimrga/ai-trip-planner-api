import { Router } from 'express';

import {
  getAllUsersRoute,
  getUserRoute,
  deleteUserRoute,
  updateUserRoleRoute
} from './users.routes';
import { adminAuth } from '../../middlewares';

const usersRouter = Router();

// Users routes should only be accessed by logged in users with "admin" role
usersRouter.use(adminAuth);

// Users routes
usersRouter.get('/', getAllUsersRoute);
usersRouter.get('/:id', getUserRoute);
usersRouter.delete('/:id', deleteUserRoute);
usersRouter.post('/:id/role', updateUserRoleRoute);

export { usersRouter };
