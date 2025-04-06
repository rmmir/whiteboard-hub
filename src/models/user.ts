import { usersTable } from '@/db/schema';

export type UserRegisterData = Pick<typeof usersTable.$inferInsert, 'name' | 'email' | 'password'>;

export type UserLoginData = Pick<typeof usersTable.$inferInsert, 'email' | 'password'>;
