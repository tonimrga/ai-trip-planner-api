import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_TOKEN_MAX_AGE } from '../consts';
import { IUserTokenPayload } from '../types';

// hashing function used for passwords
export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (e) {
    console.log('Error hashing password.', e);
  }
}

// function for comparing user password and a hash stored in database
export async function comparePasswords(password: string, userPassword: string) {
  try {
    const result = await bcrypt.compare(password, userPassword);
    return result;
  } catch (e) {
    console.log('Error comparing password.', e);
  }
}

// function for creating the JWT with user data in it
export function createJWTToken(user: IUserTokenPayload) {
  const { id, username, role } = user;
  const jwtSecret = process.env.JWT_SECRET ?? '';

  const token = jwt.sign({ id, username, role }, jwtSecret, {
    expiresIn: JWT_TOKEN_MAX_AGE
  });

  return token;
}
