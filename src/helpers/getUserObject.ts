import { User } from 'src/schemas/user.schema';

export const getUserObject = <T extends User>(user: T) => {
  return {
    email: user.email,
    avatar: user.avatar,
    lastname: user.lastname,
    firstname: user.firstname,
    role: user.role,
    phone: user.phone,
  };
};
