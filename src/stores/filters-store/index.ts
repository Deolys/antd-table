import { createEffect } from 'effector';

import { usersApi } from '@/api/users-api';
import { UsersFilters } from '@/types/user';

export const getFilteredUsersFx = createEffect(async (filters: UsersFilters) => {
  return await usersApi.getFilteredUsers(filters);
});
