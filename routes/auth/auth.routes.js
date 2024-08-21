import { JWT_TOKEN_MAX_AGE } from '../../consts/consts.js';
import { loginUserService, registerUserService } from '../../services/index.js';
import { createJWTToken } from '../../utils/index.js';

// POST /auth/register
export async function registerUserRoute(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username or password are not present.");
    }

    try {
        const user = await registerUserService(username, password);

        res.cookie("jwt", createJWTToken(user), {
            httpOnly: true,
            maxAge: JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
        });
        res.status(200).json({
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /auth/login
export async function loginUserRoute(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username or password are not present.");
    }

    try {
        const user = await loginUserService(username, password);

        if (!user) {
            res.status(400).send("Username or password are incorrect.");
        }

        res.cookie("jwt", createJWTToken(user), {
            httpOnly: true,
            maxAge: JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
        });
        res.status(200).json({
            username: user.username,
            role: user.role,
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /auth/logout
export function logoutUserRoute(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
    res.send('User logged out.');
}