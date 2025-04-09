import { z } from 'zod';
import { userCategories } from '@/types/Tags/userCategories';

export const userSchema = z.object({
  email: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(4, { message: '비밀번호는 최소 4글자 이상이어야합니다' }),

  nickname: z.string().min(4, { message: '아이디는 최소 4글자 이상이어야합니다' }),
  avatar: z.string().nullable(),
  playStyle: z.enum([...userCategories.playStyle.items]),
  skillLevel: z.enum([...userCategories.skillLevel.items]),
  gender: z.enum([...userCategories.gender.items]),
});

export type UserSchema = z.infer<typeof userSchema>;
