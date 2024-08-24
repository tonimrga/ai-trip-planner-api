import { Types } from 'mongoose';
import { Request } from 'express';

export interface ITrip {
  title: string;
  itinerary?: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  numOfTravellers?: number;
  modeOfTransport?: string;
  userId?: Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  role: string;
  email: string;
}

export interface IUserTokenPayload {
  id: Types.ObjectId;
  username: string;
  email: string;
  role: string;
}

export interface IRequest extends Request {
  userId?: string;
}
