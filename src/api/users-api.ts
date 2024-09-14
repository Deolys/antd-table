import dayjs from 'dayjs';
import localforage from 'localforage';

import userTypesData from '@/config/data/UserTypes.json';
import usersData from '@/config/data/Users.json';
import type { User, UserType, UsersFilters } from '@/types/user';

const USERS_KEY = 'users';
const USER_TYPES_KEY = 'userTypes';

export const usersApi = {
  async getUsers(): Promise<User[]> {
    return (await localforage.getItem(USERS_KEY)) || [];
  },
  async init(): Promise<void> {
    const users = await this.getUsers();
    if (users?.length !== 0) {
      return;
    }
    const usersWithTypes = usersData.map((user) => {
      const userType = userTypesData.find((type) => type.id === user.type_id);
      return { ...user, type: userType?.name };
    });
    await localforage.setItem(USERS_KEY, usersWithTypes);
    await localforage.setItem(USER_TYPES_KEY, userTypesData);
  },

  async getUserType(id: number): Promise<UserType['name'] | undefined> {
    const userTypes = await this.getUserTypes();
    const userType = userTypes.find((type) => type.id === id);

    return userType?.name;
  },

  async getUserTypes(): Promise<UserType[]> {
    return (await localforage.getItem(USER_TYPES_KEY)) || [];
  },

  async createUser(user: User): Promise<void> {
    const users = await this.getUsers();
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    user.id = newId;
    user.last_visit_date = dayjs()
      .toISOString()
      .replace(/\.\d+Z$/, '');

    users.push(user);
    await localforage.setItem(USERS_KEY, users);
  },

  async updateUser(id: number, user: User): Promise<void> {
    const users = await this.getUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users[userIndex] = user;
      await localforage.setItem(USERS_KEY, users);
    }
  },

  async deleteUser(id: number): Promise<void> {
    const users = await this.getUsers();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      await localforage.setItem(USERS_KEY, users);
    }
  },

  async getFilteredUsers(filters: UsersFilters): Promise<User[]> {
    const { name, type, dateRange } = filters;
    const users = await this.getUsers();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const lowerCaseName = name ? name.toLowerCase() : null;
    const validDateFrom = dayjs(dateRange[0]).isValid() ? dayjs(dateRange[0]).valueOf() : null;
    const validDateTo = dayjs(dateRange[1]).isValid() ? dayjs(dateRange[1]).valueOf() : null;

    const filteredUsers = users.filter((user) => {
      const userLastVisitTime = dayjs(user.last_visit_date).valueOf();

      return (
        (!lowerCaseName || user.name.toLowerCase().includes(lowerCaseName)) &&
        (!type || user.type === type) &&
        (!validDateFrom || userLastVisitTime >= validDateFrom) &&
        (!validDateTo || userLastVisitTime <= validDateTo)
      );
    });

    return filteredUsers;
  },
};
