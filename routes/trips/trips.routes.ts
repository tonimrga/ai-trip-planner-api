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

// POST /trips/plan
export async function tripPlannerRoute(req: IRequest, res: Response) {
  try {
    const tripPlan = await generateTripPlanService(req.body);
    res.send(tripPlan);
  } catch (err) {
    res.status(400).send(err);
  }
}

// POST /trips
export async function createTripRoute(req: IRequest, res: Response) {
  try {
    const userId = req.userId ?? '';
    const trip = await createTripService(userId, req.body);
    res.send(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /trips
export async function getAllTripsRoute(req: IRequest, res: Response) {
  try {
    const userId = req.userId ?? '';
    const trips = await getAllTripsService(userId);
    res.send(trips);
  } catch (err) {
    res.status(400).send(err);
  }
}

// GET /trips/:id
export async function getTripRoute(req: IRequest, res: Response) {
  try {
    const tripId = req.params.id;
    const userId = req.userId ?? '';
    const trip = await getTripService(userId, tripId);
    res.send(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// DELETE /trips/:id
export async function deleteTripRoute(req: IRequest, res: Response) {
  try {
    const tripId = req.params.id;
    const userId = req.userId ?? '';
    const trip = await deleteTripService(userId, tripId);
    res.send(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}

// PATCH /trips/:id
export async function updateTripRoute(req: IRequest, res: Response) {
  const tripId = req.params.id;
  const userId = req.userId ?? '';

  try {
    const trip = await updateTripService(userId, tripId, req.body);
    res.send(trip);
  } catch (err) {
    res.status(400).send(err);
  }
}
