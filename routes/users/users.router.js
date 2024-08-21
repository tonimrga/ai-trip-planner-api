import { Router } from 'express';

import {
    getAllUsersRoute,
    getUserRoute,
    deleteUserRoute,
    updateUserRoleRoute
} from "./users.routes.js";
import { adminAuth } from '../../middlewares/index.js';

const usersRouter = Router();
usersRouter.use(adminAuth)

usersRouter.get("/", getAllUsersRoute);
usersRouter.get("/:id", getUserRoute);
usersRouter.delete("/:id", deleteUserRoute);
usersRouter.post("/:id/role", updateUserRoleRoute);

export { usersRouter };