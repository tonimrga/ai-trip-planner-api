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
tripsRouter.use(userAuth);

tripsRouter.post('/', createTripRoute);
tripsRouter.get('/', getAllTripsRoute);
tripsRouter.get('/:id', getTripRoute);
tripsRouter.delete('/:id', deleteTripRoute);
tripsRouter.patch('/:id', updateTripRoute);
tripsRouter.post('/plan', tripPlannerRoute);

export { tripsRouter };
