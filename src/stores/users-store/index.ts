import { createEffect, createEvent, createStore, restore, sample } from 'effector';

import { usersApi } from '@/api/users-api';
import { User } from '@/types/user';

export const getUsersFx = createEffect(async (): Promise<User[]> => {
  const users = await usersApi.getUsers();
  const userTypes = $userTypes.getState();
  const usersWithTypes = users.map((user) => {
    const userType = userTypes.find((type) => type.id === user.type_id);
    return { ...user, type: userType?.name };
  });

  return usersWithTypes;
});

export const $users = restore(getUsersFx, []);

const getUserTypesFx = createEffect(usersApi.getUserTypes);

export const $userTypes = restore(getUserTypesFx, []);

const initUsersDataFx = createEffect(async () => {
  await usersApi.init();
  getUserTypesFx();
  getUsersFx();
});

await initUsersDataFx();

export const $selectedUserIds = createStore<number[]>([]);

export const deleteUsersFx = createEffect(async (ids: number[]) => {
  await usersApi.deleteUsers(ids);
});

export const selectUserIds = createEvent<number[]>();

$selectedUserIds.on(selectUserIds, (_, ids) => ids);

export const deleteUsersByIds = createEvent();

sample({
  clock: deleteUsersByIds,
  source: $selectedUserIds,
  target: deleteUsersFx,
});

sample({
  clock: deleteUsersFx.done,
  source: $users,
  fn: (users, ids) => users.filter(({ id }) => !ids.params.includes(id)),
  target: $users,
});
