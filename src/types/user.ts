export type UserType = {
  id: number;
  name: string;
  allow_edit: boolean;
};

export type User = Omit<UserType, 'allow_edit'> & {
  login: string;
  password: string;
  type_id: number;
  type?: string;
  last_visit_date: string;
};

export type UpdateUser = Omit<User, 'last_visit_date' | 'type'>;

export type CreateUser = Omit<UpdateUser, 'id'>;

export interface UsersFilters {
  name?: string;
  type?: string;
  dateRange: string[];
}
