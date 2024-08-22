import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { ACCESS_TOKEN_KEY } from '../consts';
import { IRequest, IUserTokenPayload } from '../types';

// Route middleware for checking if the user is of role="admin"
export function adminAuth(req: IRequest, res: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET ?? '';
  const token = req.cookies[ACCESS_TOKEN_KEY];

  if (!token) {
    return res.status(401).send('Not authorized, token not available.');
  }

  jwt.verify(
    token,
    jwtSecret,
    (err: VerifyErrors | null, jwtPayload: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).send('Not authorized.');
      }

      if (!jwtPayload) {
        return res.status(401).send('Not authorized.');
      }

      const user = jwtPayload as IUserTokenPayload;
      if (user.role !== 'admin') {
        return res.status(401).send('Not an admin user.');
      }

      req.userId = user.id.toString();
      next();
    }
  );
}

// Route middleware for checking if the user is of role="user"
export function userAuth(req: IRequest, res: Response, next: NextFunction) {
  const token = req.cookies[ACCESS_TOKEN_KEY];
  const jwtSecret = process.env.JWT_SECRET ?? '';

  if (!token) {
    return res.status(401).send('Not authorized, token not available.');
  }

  jwt.verify(
    token,
    jwtSecret,
    (err: VerifyErrors | null, jwtPayload: JwtPayload | string | undefined) => {
      if (err) {
        return res.status(401).send('Not authorized.');
      }

      if (!jwtPayload) {
        return res.status(401).send('Not authorized.');
      }

      const user = jwtPayload as IUserTokenPayload;
      if (user.role !== 'user' && user.role !== 'admin') {
        return res.status(401).send('User role unknown.');
      }

      req.userId = user.id.toString();
      next();
    }
  );
}
