'use client';

import { Switch } from '@/components/ui/switch';
import { gameSearchStore } from '../stores/gameSearchStore';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';

export default function CustomMacSwitch(props: { value: boolean }) {
  const gameSearch = gameSearchStore();
  const router = useRouter();

  return (
    <Switch
      checked={props.value}
      onCheckedChange={(e) => {
        if (e) {
          gameSearch.setMac('true');
        } else {
          gameSearch.setMac(undefined);
        }
        router.push(GAME_ROUTE.game_list + gameSearch.getQuery());
      }}
    />
  );
}
