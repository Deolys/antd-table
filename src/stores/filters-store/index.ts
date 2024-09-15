import { createEffect } from 'effector';

import { usersApi } from '@/api/users-api';
import { UsersFilters } from '@/types/user';

import { $userTypes } from '../users-store';

export const getFilteredUsersFx = createEffect(async (filters: UsersFilters) => {
  const users = await usersApi.getFilteredUsers(filters);
  const userTypes = $userTypes.getState();
  const usersWithTypes = users.map((user) => {
    const userType = userTypes.find((type) => type.id === user.type_id);
    return { ...user, type: userType?.name };
  });

  return usersWithTypes;
});
