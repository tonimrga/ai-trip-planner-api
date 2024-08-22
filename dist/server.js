"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
(0, config_1.connectDB)();
// auth routes
app.use('/auth', routes_1.authRouter);
// trips routes
app.use('/trips', routes_1.tripsRouter);
// trips routes
app.use('/users', routes_1.usersRouter);
// home route
app.get("/", (req, res) => res.send("Trip Planner API"));
const server = app.listen(process.env.PORT, () => console.log(`Server Connected to port ${process.env.PORT}`));
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err}`);
    server.close(() => process.exit(1));
});
