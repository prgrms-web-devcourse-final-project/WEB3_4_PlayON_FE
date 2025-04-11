'use client';

import { useToast } from '@/hooks/use-toast';
import { useStomp } from '@/hooks/useStomp';
import { useState } from 'react';

export default function ChatTest() {
  const [room, setRoom] = useState(undefined);
  const stomp = useStomp();
  const { toast } = useToast();

  return (
    <div className="bg-purple-900 text-purple-400 w-full h-screen flex flex-col items-center mt-[68px] pt-[68px] gap-10">
      <p className="text-4xl font-dgm">{room ?? 'Not Connected'}</p>
      <button
        className="text-4xl font-dgm border border-purple-400 p-5"
        onClick={async () => {
          const response = await stomp.JoinRequest(1, 1);
          if (response) {
            toast({ title: 'join success' });
          } else {
            toast({ title: 'join fail', variant: 'destructive' });
          }
        }}
      >
        Join
      </button>
      <button
        className="text-4xl font-dgm border border-purple-400 p-5"
        onClick={async () => {
          const response = await stomp.LeaveRequest(1, 1);
          if (response) {
            toast({ title: 'leave success' });
          } else {
            toast({ title: 'leave fail', variant: 'destructive' });
          }
        }}
      >
        Leave
      </button>
    </div>
  );
}
