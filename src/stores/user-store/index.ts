import { createEffect, restore, sample } from 'effector';

import { usersApi } from '@/api/users-api';
import { CreateUser, UpdateUser } from '@/types/user';
import { showErrorMessageFx, showSuccessMessageFx } from '@/utils/messages';

import { $userTypes } from '../users-store';

export const getUserFx = createEffect(async (id?: number) => {
  const user = await usersApi.getUserById(id);
  const userTypes = $userTypes.getState();
  if (user) {
    const userType = userTypes.find((type) => type.id === user.type_id);
    return { ...user, type: userType?.name };
  }
  return null;
});

export const createUserFx = createEffect(async (userData: CreateUser) => {
  return await usersApi.createUser(userData);
});

export const updateUserFx = createEffect(async (userData: UpdateUser) => {
  return await usersApi.updateUser(userData);
});

export const $user = restore(getUserFx, null);

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
