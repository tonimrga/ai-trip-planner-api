import { Request, Response } from 'express';

import {
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserRoleService
} from '../../services';

// GET /users - get all users
export async function getAllUsersRoute(req: Request, res: Response) {
  try {
    const users = await getAllUsersService();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /users/:id - get a single user
export async function getUserRoute(req: Request, res: Response) {
  try {
    const user = await getUserService(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}

// DELETE /users/:id - delete a user
export async function deleteUserRoute(req: Request, res: Response) {
  try {
    const user = await deleteUserService(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}

// POST /users/:id/role - update the user role
export async function updateUserRoleRoute(req: Request, res: Response) {
  try {
    console.log(req.body);
    const user = await updateUserRoleService(req.params.id, req.body.role);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
}
