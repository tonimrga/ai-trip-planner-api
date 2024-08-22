"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = Schema;
const TripSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    itinerary: {
        type: String,
    },
    destination: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    numOfTravellers: {
        type: Number,
    },
    modeOfTransport: {
        type: String,
    },
    userId: {
        type: ObjectId,
        required: true,
    },
});
const Trip = mongoose_1.default.model("trip", TripSchema);
exports.Trip = Trip;
