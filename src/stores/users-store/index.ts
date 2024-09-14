import { createEffect, restore } from 'effector';

import { usersApi } from '@/api/users-api';

export const getUsersFx = createEffect(usersApi.getUsers);

export const $users = restore(getUsersFx, []);

const getUserTypesFx = createEffect(usersApi.getUserTypes);

export const $userTypes = restore(getUserTypesFx, []);

const initUsersDataFx = createEffect(async () => {
  await usersApi.init();
  getUsersFx();
  getUserTypesFx();
});

await initUsersDataFx();
