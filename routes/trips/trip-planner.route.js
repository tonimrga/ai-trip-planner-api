import { generateTripPlanService } from '../../services/index.js';

export async function tripPlannerRoute(req, res) {
    const { destination, duration, numOfTravellers, modeOfTransport } = req.body;

    try {
        const tripPlan = await generateTripPlanService({
            destination,
            duration,
            numOfTravellers,
            modeOfTransport
        });

        res.send(tripPlan);
    } catch (error) {
        res.status(400).send(error);
    }
}