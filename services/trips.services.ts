import { OpenAI } from 'openai';

import { generateOpenAIQuery } from '../utils';
import { Trip } from '../models';
import { ITrip } from '../types';

// Service function for calling the openAI service and generating a trip itinerary
export async function generateTripPlanService(tripData: ITrip) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY
    });

    const query = generateOpenAIQuery(tripData);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: query
        }
      ]
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.log(err);
    throw 'Error creating a trip plan.';
  }
}

// Service function for creating a trip and saving it to the database
export async function createTripService(userId: string, tripData: ITrip) {
  try {
    const trip = await Trip.create({ ...tripData, userId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error creating a trip.';
  }
}

// Service function for getting all of the trips made by a single user
export async function getAllTripsService(userId: string) {
  try {
    const trips = await Trip.find({ userId });
    return trips;
  } catch (err) {
    console.log(err);
    throw 'Error getting trips.';
  }
}

// Service function for getting a single user trip
export async function getTripService(userId: string, tripId: string) {
  try {
    const trip = await Trip.findOne({ userId, _id: tripId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error getting a trip.';
  }
}

// Service function for deleting a single user trip
export async function deleteTripService(userId: string, tripId: string) {
  try {
    const trip = await Trip.findOneAndDelete({ userId, _id: tripId });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error deleting a trip.';
  }
}

// Service function for updating a single user trip
export async function updateTripService(userId: string, tripId: string, tripData: ITrip) {
  try {
    const trip = await Trip.findOneAndUpdate({ userId, _id: tripId }, tripData, { new: true });
    return trip;
  } catch (err) {
    console.log(err);
    throw 'Error updating a trip.';
  }
}
