import { User } from '../models';
import { comparePasswords, hashPassword } from '../utils';

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

export async function registerUserService(username: string, password: string) {
  try {
    const hash = await hashPassword(password);
    const user = await User.create({
      username,
      password: hash
    });

    return user;
  } catch (err) {
    console.log(err);
    throw 'Error creating a user.';
  }
}
