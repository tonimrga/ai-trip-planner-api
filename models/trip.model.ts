import mongoose from 'mongoose';

import { ITrip } from '../types';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TripSchema = new Schema<ITrip>({
  title: {
    type: String,
    required: true
  },
  itinerary: {
    type: String
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numOfTravellers: {
    type: Number
  },
  modeOfTransport: {
    type: String,
    enum: ['bus', 'aeroplane', 'car', 'train', 'bicycle']
  },
  interests: {
    type: [String],
    enum: ['culture', 'food', 'sports', 'museums', 'history']
  },
  userId: {
    type: ObjectId,
    required: true
  }
});

TripSchema.index({ title: 'text' });

const Trip = mongoose.model('trip', TripSchema);

export { Trip };
