import { Router } from 'express';

import {
    getAllUsersRoute,
    getUserRoute,
    deleteUserRoute,
    updateUserRoleRoute
} from "./users.routes";
import { adminAuth } from '../../middlewares';

const usersRouter = Router();
usersRouter.use(adminAuth)

usersRouter.get("/", getAllUsersRoute);
usersRouter.get("/:id", getUserRoute);
usersRouter.delete("/:id", deleteUserRoute);
usersRouter.post("/:id/role", updateUserRoleRoute);

export { usersRouter };