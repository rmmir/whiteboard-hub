import { usersTable } from '@/db/schema';

export type User = typeof usersTable.$inferSelect;

export type UserRegisterData = Pick<User, 'name' | 'email' | 'password'>;

export type UserLoginData = Pick<User, 'email' | 'password'>;
