import { api } from '../../../shared/lib/axiosInstance';
import { User } from '../types/users';

export const userService = {
  getUser: async (): Promise<User> => {
    const response = await api.get<User>('/api/user/my');
    return response.data;
  },
};

