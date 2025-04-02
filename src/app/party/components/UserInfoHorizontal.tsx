import { cn } from '@/lib/utils';
import User from '@/types/user';

interface UserInfoProps {
  size?: 'small' | 'big';
  data: User;
}

export default function UserInfo({ size = 'big', data }: UserInfoProps) {
  return (
    <div
      className={cn('inline-flex items-center gap-2', {
        'gap-[10px]': size === 'small',
        'items-start': size === 'big',
      })}
    >
      <div
        style={{
          backgroundImage: `url(${data.profile_img})`,
        }}
        className={cn('rounded-full bg-center bg-cover', {
          'w-[100px] h-[100px]': size === 'big',
          'w-9 h-9': size === 'small',
        })}
      />
      <div
        className={cn('flex gap-1', {
          'gap-2': size === 'small',
          'flex-col gap-1': size === 'big',
        })}
      >
        <p
          className={cn('text-neutral-600 font-suit font-normal', {
            'text-base': size === 'small',
            'text-sm': size === 'big',
          })}
        >
          {data.title}
        </p>
        <p
          className={cn('font-suit text-neutral-900 font-bold text-base', {
            'text-xl': size === 'big',
            'font-semibold': size === 'small',
          })}
        >
          {data.username}
        </p>
      </div>
    </div>
  );
}
