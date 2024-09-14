import { createEffect } from 'effector';

import { usersApi } from '@/api/users-api';
import { UsersFilters } from '@/types/user';

import { $users } from '../users-store';

export const getFilteredUsersFx = createEffect(async (filters: UsersFilters) => {
  return await usersApi.getFilteredUsers(filters);
});

$users.on(getFilteredUsersFx.doneData, (_, users) => users);
