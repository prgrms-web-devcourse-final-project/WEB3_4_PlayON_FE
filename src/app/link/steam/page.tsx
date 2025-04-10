'use client';

import SteamSVG from '@/components/svg/steam';
import './style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMembers } from '@/api/members';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { USER_ROUTE } from '@/constants/routes/user';

export default function LinkSteam() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;
  const router = useRouter();
  const member = useMembers();
  const { toast } = useToast();

  const searchParams = useSearchParams();
  useEffect(() => {
    async function handleSteamAuth() {
      const params: { [anyProp: string]: string } = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      const response = await member.steamAuthLinkCallback(JSON.stringify(params));
      if (response && response.status === 200) {
        toast({ title: `도전과제 달성!`, description: `스팀 연동 성공!`, variant: 'primary' });
        // setTimeout(() => router.push(USER_ROUTE.my_page), 500);
        console.log(response);
      }
    }
    handleSteamAuth();
  }, []);

  return (
    <div className="bg-purple-900 text-purple-400 w-full h-screen flex flex-col items-center mt-[68px]">
      <div className="overlay pointer-events-none"></div>
      <div className="scanline pointer-events-none"></div>
      <div className="">
        <div className="mt-16 flex flex-col pb-10">
          <div className="flex gap-5 mb-20">
            <div className="">
              <pre className="text-xs glow">{playOnASCII}</pre>
            </div>
            <div>
              <p className="text-2xl font-dgm glow">when we play on together</p>
              <p className="text-2xl font-dgm glow">the game never ends</p>
            </div>
          </div>
          <div className="font-dgm text-purple-400 mt-5 flex flex-col items-center dashed-border mb-10">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">스팀 연동 성공!</p>
            <div className="flex flex-col items-center h-[500px] justify-center gap-10">
              <p className="text-4xl text-purple-400 font-dgm bg-purple-900">스팀 인증에 성공하셨습니다</p>
              <SteamSVG fill="#8c6af0" stroke="" width={200} height={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
