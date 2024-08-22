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
exports.loginUserService = loginUserService;
exports.registerUserService = registerUserService;
const models_1 = require("../models");
const utils_1 = require("../utils");
function loginUserService(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ username });
            if (!user)
                return;
            const result = yield (0, utils_1.comparePasswords)(password, user.password);
            if (!result)
                return;
            return user;
        }
        catch (err) {
            throw "Error logging in the user.";
        }
    });
}
function registerUserService(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hash = yield (0, utils_1.hashPassword)(password);
            const user = yield models_1.User.create({
                username,
                password: hash,
            });
            return user;
        }
        catch (err) {
            throw 'Error creating a user.';
        }
    });
}
