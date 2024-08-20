import { JWT_TOKEN_MAX_AGE } from '../../consts/consts.js';
import { registerUserService } from '../../services/auth/register.service.js';
import { createJWTToken } from '../../utils/index.js';

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