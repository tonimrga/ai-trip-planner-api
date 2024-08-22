import mongoose from 'mongoose';

import { IUser } from '../types';

const { Schema } = mongoose;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  role: {
    enum: ['user', 'admin'],
    type: String,
    default: 'user',
    required: true
  }
});

const User = mongoose.model('user', UserSchema);

export { User };
