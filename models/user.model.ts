import mongoose from 'mongoose';

import { IUser } from '../types';
import { validateEmail } from '../utils';

const { Schema } = mongoose;

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validateEmail, 'Email address is not valid.']
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
