import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

import { ACCESS_TOKEN_KEY } from "../consts/consts.js";

// route middleware for checking if the user is of role="admin"
export function adminAuth(req: Request, res: Response, next: NextFunction) {
    const jwtSecret = process.env.JWT_SECRET ?? '';
    const token = req.cookies[ACCESS_TOKEN_KEY];

    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }

        if (user.role !== "admin") {
            return res.status(401).send("Not an admin user.");
        }

        req.user = user;
        next();
    });
}

// route middleware for checking if the user is of role="user"
export function userAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[ACCESS_TOKEN_KEY];
    const jwtSecret = process.env.JWT_SECRET ?? '';

    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }

        if (user.role !== "user" && user.role !== "admin") {
            return res.status(401).send("User role unknown.");
        }

        req.user = user;
        next();
    });
}