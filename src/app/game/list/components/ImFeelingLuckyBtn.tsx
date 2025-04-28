'use client';

import { useGame } from '@/api/game';
import RetroButton from '@/components/common/RetroButton';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ImFeelingLuckyBtn() {
  const game = useGame();
  const router = useRouter();
  const { toast } = useToast();

  const ImFeelingLucky = async () => {
    try {
      const response = await game.GameSearch({});
      if (response && response.totalItems) {
        const totalItems = response.totalItems;
        const randomNumber = Math.floor(Math.random() * totalItems);
        const q = Math.trunc(randomNumber / 12) + 1;
        const r = randomNumber % 12;
        const response2 = await game.GameSearch({}, { page: q, size: r });
        if (response2 && response2.items && response2.items.length > r) {
          const location = response2.items[r];
          router.push(GAME_ROUTE.game_detail(location.appid));
          return;
        }
      }
      throw new Error('Failed to feel lucky');
    } catch {
      toast({ title: '도전 과제 달성?', description: '오늘은 운이 좀 없네?', variant: 'destructive' });
    }
  };
  return (
    <RetroButton type="purple" className="mt-10 font-bold" callback={() => ImFeelingLucky()}>
      {`I'm Feeling Lucky`}
    </RetroButton>
  );
}
