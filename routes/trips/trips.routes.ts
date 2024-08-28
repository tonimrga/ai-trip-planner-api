import { Response } from 'express';

import {
  generateTripPlanService,
  createTripService,
  getAllTripsService,
  getTripService,
  deleteTripService,
  updateTripService
} from '../../services';
import { IRequest } from '../../types';

// POST /trips/plan - get trip plan from OpenAI service
export async function tripPlannerRoute(req: IRequest, res: Response) {
  try {
    const itinerary = await generateTripPlanService(req.body);
    res.status(200).json({ itinerary });
  } catch (err) {
    res.status(400).send(err);
  }
}

// POST /trips - create a trip
export async function createTripRoute(req: IRequest, res: Response) {
  try {
    const userId = req.userId ?? '';
    const trip = await createTripService(userId, req.body);
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /trips - get all user trips
export async function getAllTripsRoute(req: IRequest, res: Response) {
  try {
    const userId = req.userId ?? '';
    const trips = await getAllTripsService(userId);
    res.status(200).json(trips);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /trips/:id - get a single user trip
export async function getTripRoute(req: IRequest, res: Response) {
  try {
    const tripId = req.params.id;
    const userId = req.userId ?? '';
    const trip = await getTripService(userId, tripId);
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// DELETE /trips/:id - delete a single user trip
export async function deleteTripRoute(req: IRequest, res: Response) {
  try {
    const tripId = req.params.id;
    const userId = req.userId ?? '';
    const trip = await deleteTripService(userId, tripId);
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// PATCH /trips/:id - update a single user trip
export async function updateTripRoute(req: IRequest, res: Response) {
  const tripId = req.params.id;
  const userId = req.userId ?? '';

  try {
    const trip = await updateTripService(userId, tripId, req.body);
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}
