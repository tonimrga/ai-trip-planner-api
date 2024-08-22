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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
exports.createJWTToken = createJWTToken;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const consts_1 = require("../consts");
// hashing function used for passwords
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(password, salt);
            return hash;
        }
        catch (e) {
            console.log('Error hashing password.', e);
        }
    });
}
// function for comparing user password and a hash stored in database
function comparePasswords(password, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield bcryptjs_1.default.compare(password, userPassword);
            return result;
        }
        catch (e) {
            console.log('Error comparing password.', e);
        }
    });
}
// function for creating the JWT with user data in it
function createJWTToken(user) {
    var _a;
    const { id, username, role } = user;
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : '';
    const token = jsonwebtoken_1.default.sign({ id, username, role }, jwtSecret, {
        expiresIn: consts_1.JWT_TOKEN_MAX_AGE,
    });
    return token;
}
