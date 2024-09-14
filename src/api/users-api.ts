import dayjs from 'dayjs';
import localforage from 'localforage';

import userTypesData from '@/config/data/UserTypes.json';
import usersData from '@/config/data/Users.json';
import type { CreateUser, User, UserType, UsersFilters } from '@/types/user';

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
    await localforage.setItem(USERS_KEY, usersData);
    await localforage.setItem(USER_TYPES_KEY, userTypesData);
  },

  async getUserTypes(): Promise<UserType[]> {
    return (await localforage.getItem(USER_TYPES_KEY)) || [];
  },

  async getUserById(id?: number): Promise<User | null> {
    const users = await this.getUsers();
    const user = users.find((u) => u.id === id) || null;
    return user;
  },

  async createUser(user: CreateUser): Promise<void> {
    const users = await this.getUsers();
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const lastVisitDate = dayjs()
      .toISOString()
      .replace(/\.\d+Z$/, '');

    users.push({ ...user, id: newId, last_visit_date: lastVisitDate });
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

  async deleteUsers(ids: number[]): Promise<void> {
    const users = await this.getUsers();
    const updatedUsers = users.filter((u) => !ids.includes(u.id));
    await localforage.setItem(USERS_KEY, updatedUsers);
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
