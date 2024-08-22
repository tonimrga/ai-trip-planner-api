"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = exports.adminAuth = void 0;
var auth_middlewares_1 = require("./auth.middlewares");
Object.defineProperty(exports, "adminAuth", { enumerable: true, get: function () { return auth_middlewares_1.adminAuth; } });
Object.defineProperty(exports, "userAuth", { enumerable: true, get: function () { return auth_middlewares_1.userAuth; } });
