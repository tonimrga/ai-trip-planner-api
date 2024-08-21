import { Router } from 'express';

import {
    tripPlannerRoute,
    tripCreateRoute,
    getAllUserTripsRoute,
    getUserTripRoute,
    deleteUserTripRoute,
} from './trips.routes.js';
import { userAuth } from '../../middlewares/index.js';

const tripsRouter = Router();

tripsRouter.post('/', userAuth, tripCreateRoute);
tripsRouter.get('/', userAuth, getAllUserTripsRoute);
tripsRouter.get('/:id', userAuth, getUserTripRoute);
tripsRouter.delete('/:id', userAuth, deleteUserTripRoute);
// tripsRouter.patch('/:id', userAuth, updateTripRoute);

tripsRouter.post('/plan', userAuth, tripPlannerRoute);

export { tripsRouter };