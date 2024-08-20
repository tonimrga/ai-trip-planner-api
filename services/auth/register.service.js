import { User } from '../../models/index.js';
import { hashPassword } from '../../utils/index.js';

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