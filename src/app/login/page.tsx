'use client';

import SteamSVG from '@/components/svg/steam';
import './style.css';
import { Input } from '@/components/ui/input';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
  nickname: z.string(),
});
type LoginSchema = z.infer<typeof loginSchema>;

export default function SignupInitial() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
  });
  const router = useRouter();

  function onSubmit(data: LoginSchema) {
    console.log(data);
  }
  const [submitHover, setSubmitHover] = useState(false);

  return (
    <div className="bg-purple-900 text-purple-400 w-full h-screen flex flex-col items-center mt-[68px]">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="scrollanimation">
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
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">로그인</p>
            <div className="flex flex-col gap-3 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <p className="font-dgm text-2xl glow">ENTER YOUR EMAIL</p>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            className="border border-purple-500 rounded-none font-dgm !text-xl"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <p className="font-dgm text-2xl glow">ENTER YOUR PASSWORD</p>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            className="border border-purple-500 rounded-none font-dgm !text-xl"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <p className="text-purple-500 font-dgm text-2xl glow">ENTER YOUR NICKNAME</p>
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border border-purple-500 rounded-none font-dgm !text-xl"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <button
                    type="submit"
                    className="justify-self-center mt-5 flex items-center justify-center gap-2 border border-purple-500 hover:bg-purple-500 hover:text-white py-2 px-5"
                  >
                    <MailIcon />
                    <span className="font-dgm">LOGIN</span>
                  </button>
                </form>
              </Form>
            </div>
          </div>
          <div className="font-dgm text-purple-400 mt-5 flex flex-col items-center dashed-border mb-10">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">STEAM으로 로그인</p>
            <div className="p-2 pb-8">
              <button
                className="p-2 flex items-center justify-center gap-2"
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
              >
                <SteamSVG fill={`${submitHover ? '#bdb9f6' : '#8258ff'}`} stroke="" width={48} height={48} />
                <p className={`text-4xl font-black ${submitHover ? 'text-purple-200 glow' : ''}`}>STEAM</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-dgm text-2xl glow">아이디가 없나요?</p>
            <Link href="/signup">
              <p className="font-dgm text-2xl glow cursor-pointer hover:text-purple-200">{`[ 회원 가입하러 가기 ]`}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
