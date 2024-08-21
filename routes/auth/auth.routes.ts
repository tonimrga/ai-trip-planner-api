import { JWT_TOKEN_MAX_AGE, ACCESS_TOKEN_KEY } from '../../consts/consts';
import { loginUserService, registerUserService } from '../../services';
import { createJWTToken } from '../../utils';

// POST /auth/register
export async function registerUserRoute(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Username or password are not present.");
    }

    try {
        const user = await registerUserService(username, password);

        res.cookie(ACCESS_TOKEN_KEY, createJWTToken(user), {
            secure: true,
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

        res.cookie(ACCESS_TOKEN_KEY, createJWTToken(user), {
            secure: true,
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
    res.cookie(ACCESS_TOKEN_KEY, "", { maxAge: "1" });
    res.send('User logged out.');
}