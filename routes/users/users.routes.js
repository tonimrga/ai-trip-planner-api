import {
    deleteUserService,
    getAllUsersService,
    getUserService,
    updateUserRoleService
} from '../../services/index.js';

// GET /users
export async function getAllUsersRoute(req, res) {
    try {
        const users = await getAllUsersService(req.params.id);
        res.send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /users/:id
export async function getUserRoute(req, res) {
    try {
        const user = await getUserService(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// DELETE /users/:id
export async function deleteUserRoute(req, res) {
    try {
        const user = await deleteUserService(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /users/:id/role
export async function updateUserRoleRoute(req, res) {
    try {
        const user = await updateUserRoleService(req.params.id, req.body.role);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}