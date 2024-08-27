import { User } from '../models';
import { comparePasswords, hashPassword } from '../utils';

// Service function for logging in the user
export async function loginUserService(username: string, password: string) {
  try {
    const user = await User.findOne({ username });
    if (!user) return;

    const result = await comparePasswords(password, user.password);
    if (!result) return;

    return user;
  } catch (err) {
    console.log(err);
    throw 'Error logging in the user.';
  }
}

// Service function for registering the user
export async function registerUserService(username: string, password: string, email: string) {
  try {
    const hash = await hashPassword(password);
    const user = await User.create({
      username,
      password: hash,
      email
    });

    return user;
  } catch (err) {
    console.log(err);
    throw 'Error creating a user.';
  }
}

// Service function for getting the logged in user data
export async function getLoggedInUserDataService(userId: string) {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (err) {
    console.log(err);
    throw 'Error getting the user data.';
  }
}
