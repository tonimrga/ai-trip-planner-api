import { User } from '../../models/index.js';
import { comparePasswords } from '../../utils/index.js';

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