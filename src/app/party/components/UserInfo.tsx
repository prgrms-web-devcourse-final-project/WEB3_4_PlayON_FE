import { cn } from '@/lib/utils';

interface UserInfoProps {
  size?: 'small' | 'big';
  layout?: 'horizontal' | 'vertical';
  isRadioBtn?: boolean;
}

export default function UserInfo({ size = 'big', layout = 'vertical', isRadioBtn = false }: UserInfoProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 border-2',
        {
          'gap-[10px]': size === 'small',
        },
        {
          'flex-col': layout === 'vertical',
          'items-start': layout === 'horizontal' && size === 'big',
        }
      )}
    >
      <div
        style={{
          backgroundImage: `url('https://placehold.co/100')`,
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
        {layout === 'horizontal' && (
          <p
            className={cn('text-neutral-600 font-suit font-normal', {
              'text-base': size === 'small',
              'text-sm': size === 'big',
            })}
          >
            칭호명
          </p>
        )}
        <p
          className={cn('font-suit text-neutral-900 font-bold text-base', {
            'text-xl': size === 'big' && layout === 'horizontal',
            'font-semibold': size === 'small',
          })}
        >
          USERNAME
        </p>
      </div>
    </div>
  );
}
