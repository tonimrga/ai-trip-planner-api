import { Router } from 'express';

import {
    tripPlannerRoute,
    tripCreateRoute,
    getAllTripsRoute,
    getTripRoute,
    deleteTripRoute,
    updateTripRoute,
} from './trips.routes.js';
import { userAuth } from '../../middlewares/index.js';

const tripsRouter = Router();

tripsRouter.post('/', userAuth, tripCreateRoute);
tripsRouter.get('/', userAuth, getAllTripsRoute);
tripsRouter.get('/:id', userAuth, getTripRoute);
tripsRouter.delete('/:id', userAuth, deleteTripRoute);
tripsRouter.patch('/:id', userAuth, updateTripRoute);
tripsRouter.post('/plan', userAuth, tripPlannerRoute);

export { tripsRouter };