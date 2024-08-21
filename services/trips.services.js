import { OpenAI } from 'openai';

import { generateOpenAIQuery } from '../utils/index.js';
import { Trip } from '../models/index.js';

export async function generateTripPlanService(tripData) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPEN_AI_KEY
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: generateOpenAIQuery(tripData)
                }
            ],
        });

        return completion.choices[0].message.content;
    } catch {
        throw "Error creating a trip plan.";
    }
}

export async function tripCreateService(tripData) {
    try {
        const trip = await Trip.create(tripData);
        return trip;
    } catch (err) {
        throw 'Error creating a trip.';
    }
}


export async function getAllUserTripsService(userId) {
    try {
        const trips = await Trip.find({ userId });
        return trips;
    } catch (err) {
        throw 'Error getting trips.';
    }
}

export async function getUserTripService(userId, tripId) {
    try {
        const trip = await Trip.findOne({ userId, _id: tripId });
        return trip;
    } catch (err) {
        throw 'Error getting trips.';
    }
}

export async function deleteUserTripService(userId, tripId) {
    try {
        const trip = await Trip.findOneAndDelete({ userId, _id: tripId });
        return trip;
    } catch (err) {
        throw 'Error getting trips.';
    }
}
