import { cn } from '@/lib/utils';
import { userSimple } from '@/types/user';

interface UserInfoHorizontalProps {
  size?: 'small' | 'big';
  data: userSimple;
}

export default function UserInfoHorizontal({ size = 'big', data }: UserInfoHorizontalProps) {
  // 기본 이미지
  const defaultImg = '/img/dummy_profile.jpg';

  return (
    <div
      className={cn('inline-flex items-center gap-2', {
        'gap-[10px]': size === 'small',
        'items-start': size === 'big',
      })}
    >
      <div
        style={{
          backgroundImage: `url(${data.img_src || defaultImg} )`,
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
          {data.user_title}
          {/* {data.user_title || "내가 제일 잘나가"}  */}
        </p>
        <p
          className={cn('font-suit text-neutral-900 font-bold text-base', {
            'text-xl': size === 'big',
            'font-semibold': size === 'small',
          })}
        >
          {data.nickname}
        </p>
      </div>
    </div>
  );
}
