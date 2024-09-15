import dayjs from 'dayjs';
import { createEffect, createEvent, createStore, restore, sample } from 'effector';

import { usersApi } from '@/api/users-api';

import { getFilteredUsersFx } from '../filters-store';

export const getUsersFx = createEffect(usersApi.getUsers);

const getUserTypesFx = createEffect(usersApi.getUserTypes);

export const deleteUsersFx = createEffect(async (ids: number[]) => {
  await usersApi.deleteUsers(ids);
});

const initUsersDataFx = createEffect(async () => {
  await usersApi.init();
  getUserTypesFx();
  getUsersFx();
});
initUsersDataFx();

export const selectUserIds = createEvent<number[]>();
export const deleteUsersByIds = createEvent();

export const $users = restore(getUsersFx, []);
export const $userTypes = restore(getUserTypesFx, []);
export const $selectedUserIds = createStore<number[]>([]);

$selectedUserIds.on(deleteUsersFx.done, () => []);
$selectedUserIds.on(selectUserIds, (_, ids) => ids);

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

sample({
  clock: initUsersDataFx.done,
  fn: () => ({ dateRange: [`${dayjs('2021-01-01')}`, `${dayjs()}`] }),
  target: getFilteredUsersFx,
});

$users.on(getFilteredUsersFx.doneData, (_, users) => users);
