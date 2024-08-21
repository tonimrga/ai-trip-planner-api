import { User } from '../models/index.js';
import { comparePasswords, hashPassword } from '../utils/index.js';

export async function loginUserService(username, password) {
    try {
        const user = await User.findOne({ username });
        if (!user) return;

        const result = await comparePasswords(password, user.password);
        if (!result) return;

        return user;
    } catch (err) {
        throw "Error logging in the user.";
    }
}

export async function registerUserService(username, password) {
    try {
        const hash = await hashPassword(password);
        const user = await User.create({
            username,
            password: hash,
        });

        return user;
    } catch (err) {
        throw 'Error creating a user.';
    }
}