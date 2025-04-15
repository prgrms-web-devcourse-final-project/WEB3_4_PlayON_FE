'use client';

import SteamSVG from '@/components/svg/steam';
import '../style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMembers } from '@/api/members';
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import { USER_ROUTE } from '@/constants/routes/user';

export default function InnerPage() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;
  const router = useRouter();
  const member = useMembers();
  const { setUser } = useAuthStore();

  const searchParams = useSearchParams();
  useEffect(() => {
    async function handleSteamAuth() {
      const params: { [anyProp: string]: string } = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      const response = await member.steamAuthSignupCallback(JSON.stringify(params));
      if (response && response.status === 200) {
        const me = await member.GetMe();
        if (me) {
          setUser(me);
          router.push(USER_ROUTE.signup_userdata);
        }
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
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">회원가입 성공!</p>
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
function setMemberId(memberId: any) {
  throw new Error('Function not implemented.');
}
