'use client';

import { Switch } from '@/components/ui/switch';
import { gameSearchStore } from '../stores/gameSearchStore';
import { useRouter } from 'next/navigation';
import { GAME_ROUTE } from '@/constants/routes/game';
import { useEffect } from 'react';

export default function CustomMacSwitch(props: { value: boolean }) {
  const { setMac, getQuery } = gameSearchStore();
  const router = useRouter();

  useEffect(() => {
    if (props.value) {
      setMac('true');
    } else {
      setMac(undefined);
    }
  }, [props.value]);

  return (
    <Switch
      checked={props.value}
      onCheckedChange={(e) => {
        if (e) {
          setMac('true');
        } else {
          setMac(undefined);
        }
        router.push(GAME_ROUTE.game_list + getQuery(), { scroll: false });
      }}
    />
  );
}
