import { Request, Response } from 'express';

import {
    generateTripPlanService,
    createTripService,
    getAllTripsService,
    getTripService,
    deleteTripService,
    updateTripService,
} from '../../services';
import { prepareTripDataObject } from '../../utils';
import { IRequest } from '../../types';

// POST /trips/plan
export async function tripPlannerRoute(req: IRequest, res: Response) {
    try {
        const tripData = prepareTripDataObject(req.body);
        const tripPlan = await generateTripPlanService(tripData);
        res.send(tripPlan);
    } catch (error) {
        res.status(400).send(error);
    }
}

// POST /trips
export async function createTripRoute(req: IRequest, res: Response) {
    try {
        const userId = req.userId ?? '';
        const tripData = prepareTripDataObject(req.body);
        const trip = await createTripService(userId, tripData);

        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips
export async function getAllTripsRoute(req: IRequest, res: Response) {
    try {
        const userId = req.userId ?? '';
        const trips = await getAllTripsService(userId);
        res.send(trips);
    } catch (error) {
        res.status(400).send(error);
    }
}

// GET /trips/:id
export async function getTripRoute(req: IRequest, res: Response) {
    try {
        const tripId = req.params.id;
        const userId = req.userId ?? '';
        const trip = await getTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// DELETE /trips/:id
export async function deleteTripRoute(req: IRequest, res: Response) {
    try {
        const tripId = req.params.id;
        const userId = req.userId ?? '';
        const trip = await deleteTripService(userId, tripId);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}

// PATCH /trips/:id
export async function updateTripRoute(req: IRequest, res: Response) {
    const tripId = req.params.id;
    const userId = req.userId ?? '';
    const tripData = prepareTripDataObject(req.body);

    try {
        const trip = await updateTripService(userId, tripId, tripData);
        res.send(trip);
    } catch (error) {
        res.status(400).send(error);
    }
}
