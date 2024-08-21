import {
    generateTripPlanService,
    tripCreateService,
    getAllUserTripsService,
    getUserTripService,
    deleteUserTripService,
} from '../../services/index.js';

// POST /trips/plan
export async function tripPlannerRoute(req, res) {
    const { destination, startDate, endDate, numOfTravellers, modeOfTransport } = req.body;

    try {
        const tripPlan = await generateTripPlanService({
            destination,
            startDate,
            endDate,
            numOfTravellers,
            modeOfTransport
        });

        res.send(tripPlan);
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /trips
export async function tripCreateRoute(req, res) {
    const {
        title,
        itinerary,
        destination,
        startDate,
        endDate,
        numOfTravellers,
        modeOfTransport
    } = req.body;
    const { id } = req.user;

    try {
        const trip = await tripCreateService({
            title,
            itinerary,
            destination,
            startDate,
            endDate,
            numOfTravellers,
            modeOfTransport,
            userId: id,
        });

        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips
export async function getAllUserTripsRoute(req, res) {
    try {
        const trips = await getAllUserTripsService(req.user.id);
        res.send(trips);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips/:id
export async function getUserTripRoute(req, res) {
    try {
        const tripId = req.params.id;
        const userId = req.user.id;
        const trip = await getUserTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// DELETE /trips/:id
export async function deleteUserTripRoute(req, res) {
    try {
        const tripId = req.params.id;
        const userId = req.user.id;
        const trip = await deleteUserTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}