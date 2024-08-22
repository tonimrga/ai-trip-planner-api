import { Router } from 'express';

import {
  tripPlannerRoute,
  createTripRoute,
  getAllTripsRoute,
  getTripRoute,
  deleteTripRoute,
  updateTripRoute
} from './trips.routes';
import { userAuth } from '../../middlewares';

const tripsRouter = Router();

// Trips routes should only be accessed by logged in users with "user" role
tripsRouter.use(userAuth);

// Trips routes
tripsRouter.post('/', createTripRoute);
tripsRouter.get('/', getAllTripsRoute);
tripsRouter.get('/:id', getTripRoute);
tripsRouter.delete('/:id', deleteTripRoute);
tripsRouter.patch('/:id', updateTripRoute);
tripsRouter.post('/plan', tripPlannerRoute);

export { tripsRouter };
