import { Request, Response } from 'express';

import { JWT_TOKEN_MAX_AGE, ACCESS_TOKEN_KEY } from '../../consts';
import { loginUserService, registerUserService, getLoggedInUserDataService } from '../../services';
import { createJWTToken } from '../../utils';
import { IRequest } from '../../types';

// POST /auth/register - register the user and send a jwt token in a cookie
export async function registerUserRoute(req: Request, res: Response) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).send('Username, email or password are not present.');
  }

  if (password.length < 6) {
    return res.status(400).send('Password should be 6 characters or more.');
  }

  try {
    const user = await registerUserService(username, password, email);

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.cookie(ACCESS_TOKEN_KEY, createJWTToken(payload), {
      secure: true,
      httpOnly: true,
      maxAge: JWT_TOKEN_MAX_AGE * 1000 // 3hrs in ms
    });
    res.status(200).json(payload);
  } catch (err) {
    res.status(400).send(err);
  }
}

// POST /auth/login - login the user and send a jwt token in a cookie
export async function loginUserRoute(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username or password are not present.');
  }

  try {
    const user = await loginUserService(username, password);

    if (!user) {
      res.status(400).send('Username or password are incorrect.');
      return;
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.cookie(ACCESS_TOKEN_KEY, createJWTToken(payload), {
      secure: true,
      httpOnly: true,
      maxAge: JWT_TOKEN_MAX_AGE * 1000 // 3hrs in ms
    });
    res.status(200).json(payload);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /auth/user - get the currently logged in user data
export async function getUserData(req: IRequest, res: Response) {
  try {
    const userId = req.userId ?? '';
    const user = await getLoggedInUserDataService(userId);

    if (!user) {
      res.status(400).send('User is not found.');
      return;
    }

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

// POST /auth/logout - logout the user and remove the jwt cookie
export function logoutUserRoute(req: Request, res: Response) {
  res.cookie(ACCESS_TOKEN_KEY, '', { maxAge: 1 });
  res.send('User logged out.');
}
