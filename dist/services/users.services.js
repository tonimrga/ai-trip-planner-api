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
exports.getAllUsersService = getAllUsersService;
exports.getUserService = getUserService;
exports.deleteUserService = deleteUserService;
exports.updateUserRoleService = updateUserRoleService;
const models_1 = require("../models");
function getAllUsersService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield models_1.User.find();
            return users;
        }
        catch (err) {
            throw 'Error getting users.';
        }
    });
}
function getUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ _id: userId });
            return user;
        }
        catch (err) {
            throw 'Error getting a user.';
        }
    });
}
function deleteUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndDelete({ _id: userId });
            return user;
        }
        catch (err) {
            throw 'Error deleting a user.';
        }
    });
}
function updateUserRoleService(userId, role) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOneAndUpdate({ _id: userId }, { role }, { new: true });
            return user;
        }
        catch (err) {
            throw 'Error updating a user role.';
        }
    });
}
