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
exports.generateTripPlanService = generateTripPlanService;
exports.createTripService = createTripService;
exports.getAllTripsService = getAllTripsService;
exports.getTripService = getTripService;
exports.deleteTripService = deleteTripService;
exports.updateTripService = updateTripService;
const openai_1 = require("openai");
const utils_1 = require("../utils");
const models_1 = require("../models");
function generateTripPlanService(tripData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const openai = new openai_1.OpenAI({
                apiKey: process.env.OPEN_AI_KEY
            });
            const completion = yield openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: (0, utils_1.generateOpenAIQuery)(tripData)
                    }
                ],
            });
            return completion.choices[0].message.content;
        }
        catch (_a) {
            throw "Error creating a trip plan.";
        }
    });
}
function createTripService(userId, tripData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trip = yield models_1.Trip.create(Object.assign(Object.assign({}, tripData), { userId }));
            return trip;
        }
        catch (err) {
            throw 'Error creating a trip.';
        }
    });
}
function getAllTripsService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trips = yield models_1.Trip.find({ userId });
            return trips;
        }
        catch (err) {
            throw 'Error getting trips.';
        }
    });
}
function getTripService(userId, tripId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trip = yield models_1.Trip.findOne({ userId, _id: tripId });
            return trip;
        }
        catch (err) {
            throw 'Error getting a trip.';
        }
    });
}
function deleteTripService(userId, tripId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trip = yield models_1.Trip.findOneAndDelete({ userId, _id: tripId });
            return trip;
        }
        catch (err) {
            throw 'Error deleting a trip.';
        }
    });
}
function updateTripService(userId, tripId, tripData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trip = yield models_1.Trip.findOneAndUpdate({ userId, _id: tripId }, tripData, { new: true });
            return trip;
        }
        catch (err) {
            throw 'Error updating a trip.';
        }
    });
}
