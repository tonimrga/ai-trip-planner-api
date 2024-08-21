import {
    generateTripPlanService,
    tripCreateService,
    getAllTripsService,
    getTripService,
    deleteTripService,
    updateTripService,
} from '../../services/index.js';
import { prepareTripDataObject } from '../../utils/index.js';

// POST /trips/plan
export async function tripPlannerRoute(req, res) {
    try {
        const tripData = prepareTripDataObject(req.body);
        const tripPlan = await generateTripPlanService(tripData);
        res.send(tripPlan);
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /trips
export async function tripCreateRoute(req, res) {
    try {
        const tripData = prepareTripDataObject(req.body);
        const trip = await tripCreateService({
            ...tripData,
            userId: req.user.id,
        });

        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips
export async function getAllTripsRoute(req, res) {
    try {
        const trips = await getAllTripsService(req.user.id);
        res.send(trips);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips/:id
export async function getTripRoute(req, res) {
    try {
        const tripId = req.params.id;
        const userId = req.user.id;
        const trip = await getTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// DELETE /trips/:id
export async function deleteTripRoute(req, res) {
    try {
        const tripId = req.params.id;
        const userId = req.user.id;
        const trip = await deleteTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// PATCH /trips/:id
export async function updateTripRoute(req, res) {
    const tripId = req.params.id;
    const userId = req.user.id;
    const tripData = prepareTripDataObject(req.body);

    try {
        const trip = await updateTripService(userId, tripId, tripData);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}