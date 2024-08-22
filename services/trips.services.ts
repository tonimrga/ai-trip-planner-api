import { OpenAI } from 'openai';

import { generateOpenAIQuery } from '../utils';
import { Trip } from '../models';
import { ITrip } from '../types';

export async function generateTripPlanService(tripData: ITrip) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: generateOpenAIQuery(tripData)
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.log(err);
    throw 'Error creating a trip plan.';
  }
}

export async function createTripService(userId: string, tripData: ITrip) {
  try {
    const trip = await Trip.create({ ...tripData, userId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error creating a trip.';
  }
}

export async function getAllTripsService(userId: string) {
  try {
    const trips = await Trip.find({ userId });
    return trips;
  } catch (err) {
    console.log(err);
    throw 'Error getting trips.';
  }
}

export async function getTripService(userId: string, tripId: string) {
  try {
    const trip = await Trip.findOne({ userId, _id: tripId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error getting a trip.';
  }
}

export async function deleteTripService(userId: string, tripId: string) {
  try {
    const trip = await Trip.findOneAndDelete({ userId, _id: tripId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error deleting a trip.';
  }
}

export async function updateTripService(userId: string, tripId: string, tripData: ITrip) {
  try {
    const trip = await Trip.findOneAndUpdate({ userId, _id: tripId }, tripData, { new: true });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error updating a trip.';
  }
}
