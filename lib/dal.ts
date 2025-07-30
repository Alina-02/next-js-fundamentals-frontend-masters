import { db } from '@/db';
import { getSession } from './auth';
import { eq } from 'drizzle-orm';
import { cache } from 'react';
import { issues, users } from '@/db/schema';
import { mockDelay } from './utils';

export const getCurrentUser = () => {
  const session = await getSession();
  if (!session) return null;

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId));

    return result[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByEmail = (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
