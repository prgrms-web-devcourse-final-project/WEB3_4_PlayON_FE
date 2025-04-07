import SteamSVG from '@/components/svg/steam';
import './style.css';
import { Input } from '@/components/ui/input';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';

export default function SignupInitial() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;

  return (
    <div className="bg-purple-900 text-purple-400 w-full h-screen flex flex-col items-center">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
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
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">이메일로 회원가입</p>
            <div className="flex flex-col gap-3 pb-8">
              <p className="font-dgm text-2xl">ENTER YOUR EMAIL</p>
              <Input className="border border-purple-500 rounded-none font-dgm !text-xl" />
              <p className="font-dgm text-2xl">ENTER YOUR PASSWORD</p>
              <Input type="password" className="border border-purple-500 rounded-none font-dgm !text-xl" />
              <button className="mt-5 flex items-center justify-center gap-2 border border-purple-500 hover:bg-purple-500 hover:text-white p-2">
                <MailIcon />
                <span className="font-dgm">REGISTER</span>
              </button>
            </div>
          </div>
          <div className="font-dgm text-purple-400 mt-5 flex flex-col items-center dashed-border mb-10">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">STEAM으로 회원가입</p>
            <div className="p-2 pb-8">
              <button className="p-2 flex items-center justify-center gap-2 rounded hover:outline outline-purple-500">
                <SteamSVG fill={'#8258ff'} stroke="" width={48} height={48} />
                <p className="text-4xl font-black">STEAM</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/signup">
              <p className="font-dgm text-2xl glow hover:text-purple-200 cursor-pointer">{`[ 로그인하러 가기 ]`}</p>
            </Link>
            <Link href="/signup">
              <p className="font-dgm text-2xl glow hover:text-purple-200 cursor-pointer">{`[ 메인으로 돌아가기 ]`}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
