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
exports.getAllUsersRoute = getAllUsersRoute;
exports.getUserRoute = getUserRoute;
exports.deleteUserRoute = deleteUserRoute;
exports.updateUserRoleRoute = updateUserRoleRoute;
const services_1 = require("../../services");
// GET /users
function getAllUsersRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, services_1.getAllUsersService)();
            res.send(users);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// GET /users/:id
function getUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, services_1.getUserService)(req.params.id);
            res.send(user);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// DELETE /users/:id
function deleteUserRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, services_1.deleteUserService)(req.params.id);
            res.send(user);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// POST /users/:id/role
function updateUserRoleRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const user = yield (0, services_1.updateUserRoleService)(req.params.id, req.body.role);
            res.send(user);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
