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

export async function createTripService(tripData) {
    try {
        const trip = await Trip.create(tripData);
        return trip;
    } catch (err) {
        throw 'Error creating a trip.';
    }
}

export async function getAllTripsService(userId) {
    try {
        const trips = await Trip.find({ userId });
        return trips;
    } catch (err) {
        throw 'Error getting trips.';
    }
}

export async function getTripService(userId, tripId) {
    try {
        const trip = await Trip.findOne({ userId, _id: tripId });
        return trip;
    } catch (err) {
        throw 'Error getting a trip.';
    }
}

export async function deleteTripService(userId, tripId) {
    try {
        const trip = await Trip.findOneAndDelete({ userId, _id: tripId });
        return trip;
    } catch (err) {
        throw 'Error deleting a trip.';
    }
}

export async function updateTripService(userId, tripId, tripData) {
    try {
        const trip = await Trip.findOneAndUpdate({ userId, _id: tripId }, tripData, { new: true });
        return trip;
    } catch (err) {
        throw 'Error updating a trip.';
    }
}
