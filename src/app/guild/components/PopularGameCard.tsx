import { PATH } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { gameSimple } from '@/types/games';
import { useRouter } from 'next/navigation';

interface PopularGameCardProps {
  data: gameSimple;
  size: 'large' | 'medium' | 'small';
}

export function PopularGameCard({ data, size }: PopularGameCardProps) {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundImage: `url(${data.img_src})`,
      }}
      className="w-full h-full bg-center bg-cover rounded-lg overflow-hidden cursor-pointer"
      onClick={() => router.push(`${PATH.guild_list}?game=`)}
    >
      <div
        className={cn('w-full h-full bg-gradient-to-t from-black/50 to-black/0  flex items-end hover:from-black/30', {
          'px-9 py-5': size === 'large',
          'px-7 py-5': size === 'medium',
          'px-6 py-4': size === 'small',
        })}
      >
        <p
          className={cn('text-white text-3xl font-extrabold truncate', {
            'text-5xl': size === 'large',
            'text-4xl': size === 'medium',
            'text-3xl': size === 'small',
          })}
        >
          {data.title}
        </p>
      </div>
    </div>
  );
}
