import { createEffect, createEvent, restore, sample } from 'effector';

import { usersApi } from '@/api/users-api';
import { CreateUser, UpdateUser } from '@/types/user';
import { showErrorMessageFx, showSuccessMessageFx } from '@/utils/messages';

export const getUserFx = createEffect(async (id?: number) => {
  return await usersApi.getUserById(id);
});

export const createUserFx = createEffect(async (userData: CreateUser) => {
  return await usersApi.createUser(userData);
});

export const updateUserFx = createEffect(async (userData: UpdateUser) => {
  return await usersApi.updateUser(userData);
});

export const $user = restore(getUserFx, null);

export const clearUserData = createEvent();
$user.on(clearUserData, () => null);

sample({
  clock: createUserFx.doneData,
  fn() {
    return 'Пользователь успешно создан';
  },
  target: showSuccessMessageFx,
});

sample({
  clock: updateUserFx.doneData,
  fn() {
    return 'Данные пользователя успешно обновлены';
  },
  target: showSuccessMessageFx,
});

sample({
  clock: createUserFx.failData,
  target: showErrorMessageFx,
});

sample({
  clock: updateUserFx.failData,
  target: showErrorMessageFx,
});
