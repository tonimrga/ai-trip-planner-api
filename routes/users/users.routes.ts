import { Request, Response } from 'express';

import {
    deleteUserService,
    getAllUsersService,
    getUserService,
    updateUserRoleService
} from '../../services';

// GET /users
export async function getAllUsersRoute(req: Request, res: Response) {
    try {
        const users = await getAllUsersService();
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /users/:id
export async function getUserRoute(req: Request, res: Response) {
    try {
        const user = await getUserService(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// DELETE /users/:id
export async function deleteUserRoute(req: Request, res: Response) {
    try {
        const user = await deleteUserService(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /users/:id/role
export async function updateUserRoleRoute(req: Request, res: Response) {
    try {
        console.log(req.body)
        const user = await updateUserRoleService(req.params.id, req.body.role);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}