import { createEffect, restore } from 'effector';

import { usersApi } from '@/api/users-api';
import { CreateUser } from '@/types/user';

export const getUserFx = createEffect(async (id?: number) => {
  return await usersApi.getUserById(id);
});
export const $user = restore(getUserFx, null);

export const createUserFx = createEffect(async (userData: CreateUser) => {
  return await usersApi.createUser(userData);
});

$user.on(getUserFx.doneData, (_, user) => user);
