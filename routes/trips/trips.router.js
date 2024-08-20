import { Router } from 'express';

import { tripPlannerRoute } from './index.js';
import { userAuth } from '../../middlewares/index.js';

const tripsRouter = Router();

tripsRouter.post('/plan', userAuth, tripPlannerRoute);

export { tripsRouter };