import { User } from '../models';

export async function getAllUsersService() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw 'Error getting users.';
  }
}

export async function getUserService(userId: string) {
  try {
    const user = await User.findOne({ _id: userId });
    return user;
  } catch (err) {
    console.log(err);
    throw 'Error getting a user.';
  }
}

export async function deleteUserService(userId: string) {
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    return user;
  } catch (err) {
    console.log(err);
    throw 'Error deleting a user.';
  }
}

export async function updateUserRoleService(userId: string, role: string) {
  try {
    const user = await User.findOneAndUpdate({ _id: userId }, { role }, { new: true });
    return user;
  } catch (err) {
    console.log(err);
    throw 'Error updating a user role.';
  }
}
