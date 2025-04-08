import { z } from 'zod';
import { userCategories } from '@/types/Tags/userCategories';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  nickname: z.string(),
  avatar: z.string().url(),
  playStyle: z.enum([...userCategories.playStyle.items]),
  skillLevel: z.enum([...userCategories.skillLevel.items]),
  friendly: z.enum([...userCategories.friendly.items]),
  gender: z.enum([...userCategories.gender.items]),
});

export type UserSchema = z.infer<typeof userSchema>;
