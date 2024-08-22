"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = adminAuth;
exports.userAuth = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const consts_1 = require("../consts");
// route middleware for checking if the user is of role="admin"
function adminAuth(req, res, next) {
    var _a;
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '';
    const token = req.cookies[consts_1.ACCESS_TOKEN_KEY];
    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, jwtPayload) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }
        if (!jwtPayload) {
            return res.status(401).send("Not authorized.");
        }
        const user = jwtPayload;
        if (user.role !== "admin") {
            return res.status(401).send("Not an admin user.");
        }
        req.userId = user.id.toString();
        next();
    });
}
// route middleware for checking if the user is of role="user"
function userAuth(req, res, next) {
    var _a;
    const token = req.cookies[consts_1.ACCESS_TOKEN_KEY];
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '';
    if (!token) {
        return res.status(401).send("Not authorized, token not available.");
    }
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, jwtPayload) => {
        if (err) {
            return res.status(401).send("Not authorized.");
        }
        if (!jwtPayload) {
            return res.status(401).send("Not authorized.");
        }
        const user = jwtPayload;
        if (user.role !== "user" && user.role !== "admin") {
            return res.status(401).send("User role unknown.");
        }
        req.userId = user.id.toString();
        next();
    });
}
