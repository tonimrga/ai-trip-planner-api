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
exports.tripPlannerRoute = tripPlannerRoute;
exports.createTripRoute = createTripRoute;
exports.getAllTripsRoute = getAllTripsRoute;
exports.getTripRoute = getTripRoute;
exports.deleteTripRoute = deleteTripRoute;
exports.updateTripRoute = updateTripRoute;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
// POST /trips/plan
function tripPlannerRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tripData = (0, utils_1.prepareTripDataObject)(req.body);
            const tripPlan = yield (0, services_1.generateTripPlanService)(tripData);
            res.send(tripPlan);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// POST /trips
function createTripRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
            const tripData = (0, utils_1.prepareTripDataObject)(req.body);
            const trip = yield (0, services_1.createTripService)(userId, tripData);
            res.send(trip);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// GET /trips
function getAllTripsRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
            const trips = yield (0, services_1.getAllTripsService)(userId);
            res.send(trips);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// GET /trips/:id
function getTripRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const tripId = req.params.id;
            const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
            const trip = yield (0, services_1.getTripService)(userId, tripId);
            res.send(trip);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// DELETE /trips/:id
function deleteTripRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const tripId = req.params.id;
            const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
            const trip = yield (0, services_1.deleteTripService)(userId, tripId);
            res.send(trip);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
// PATCH /trips/:id
function updateTripRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const tripId = req.params.id;
        const userId = (_a = req.userId) !== null && _a !== void 0 ? _a : '';
        const tripData = (0, utils_1.prepareTripDataObject)(req.body);
        try {
            const trip = yield (0, services_1.updateTripService)(userId, tripId, tripData);
            res.send(trip);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
}
