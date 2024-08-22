"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = exports.tripsRouter = exports.authRouter = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return auth_1.authRouter; } });
var trips_1 = require("./trips");
Object.defineProperty(exports, "tripsRouter", { enumerable: true, get: function () { return trips_1.tripsRouter; } });
var users_1 = require("./users");
Object.defineProperty(exports, "usersRouter", { enumerable: true, get: function () { return users_1.usersRouter; } });
