import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User } from '../types/users';

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: () => userService.getUser(),
    staleTime: 0,
    gcTime: 0,
  });
}; 