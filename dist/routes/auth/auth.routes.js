"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserRoute = registerUserRoute;
exports.loginUserRoute = loginUserRoute;
exports.logoutUserRoute = logoutUserRoute;
const consts_1 = require("../../consts");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
// POST /auth/register
function registerUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Username or password are not present.");
        }
        if (password.length < 6) {
            return res.status(400).send("Password should be 6 characters or more.");
        }
        try {
            const user = yield (0, services_1.registerUserService)(username, password);
            const tokenPayload = { id: user._id, username: user.username, role: user.role };
            res.cookie(consts_1.ACCESS_TOKEN_KEY, (0, utils_1.createJWTToken)(tokenPayload), {
                secure: true,
                httpOnly: true,
                maxAge: consts_1.JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
            });
            res.status(200).json({
                username: user.username,
                role: user.role,
            });
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// POST /auth/login
function loginUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Username or password are not present.");
        }
        try {
            const user = yield (0, services_1.loginUserService)(username, password);
            if (!user) {
                res.status(400).send("Username or password are incorrect.");
                return;
            }
            const tokenPayload = { id: user._id, username: user.username, role: user.role };
            res.cookie(consts_1.ACCESS_TOKEN_KEY, (0, utils_1.createJWTToken)(tokenPayload), {
                secure: true,
                httpOnly: true,
                maxAge: consts_1.JWT_TOKEN_MAX_AGE * 1000, // 3hrs in ms
            });
            res.status(200).json({
                username: user.username,
                role: user.role,
            });
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// POST /auth/logout
function logoutUserRoute(req, res) {
    res.cookie(consts_1.ACCESS_TOKEN_KEY, "", { maxAge: 1 });
    res.send('User logged out.');
}
