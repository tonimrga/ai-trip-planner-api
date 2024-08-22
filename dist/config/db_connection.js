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
exports.connectDB = connectDB;
const mongoose_1 = require("mongoose");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            yield (0, mongoose_1.connect)((_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : '');
            console.log("MongoDB connected.");
        }
        catch (e) {
            console.log('Error connecting to the database.', e);
        }
    });
}
;
