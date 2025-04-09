'use client';

import SteamSVG from '@/components/svg/steam';
import './style.css';
import { Input } from '@/components/ui/input';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { userSchema } from './userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMembers } from '@/api/members';
import { USER_ROUTE } from '@/constants/routes/user';
import { useAuthStore } from '@/stores/authStore';

const userInitialSchema = userSchema.pick({
  email: true,
  password: true,
});
type UserInitialSchema = z.infer<typeof userInitialSchema>;

export default function SignupInitial() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;
  const form = useForm<UserInitialSchema>({
    resolver: zodResolver(userInitialSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();
  const member = useMembers();
  const { setUser } = useAuthStore();
  async function onSubmit(data: UserInitialSchema) {
    const response = await member.Signup(data.email, data.password);
    if (response) {
      const user = await member.GetMe();
      if (user) {
        setUser(user);
      }
      router.push(USER_ROUTE.signup_userdata, { scroll: true });
    }
  }
  async function steamAuth() {
    const response = await member.steamAuthSignup();
    window.location.href = response;
  }
  const [submitHover, setSubmitHover] = useState(false);

  return (
    <div className="bg-purple-900 text-purple-400 w-full h-screen flex flex-col items-center mt-[68px]">
      <div className="overlay pointer-events-none"></div>
      <div className="scanline pointer-events-none"></div>
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
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">회원가입</p>
            <div className="flex flex-col gap-3 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          {form.formState.errors.email ? (
                            <FormMessage className="font-dgm text-xl glow" />
                          ) : (
                            <p className="font-dgm text-2xl glow">ENTER YOUR USERNAME</p>
                          )}
                        </div>
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          {form.formState.errors.password ? (
                            <FormMessage className="font-dgm text-xl glow" />
                          ) : (
                            <p className="font-dgm text-2xl glow">ENTER YOUR PASSWORD</p>
                          )}
                        </div>
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
                  <button
                    type="submit"
                    className="justify-self-center mt-5 flex items-center justify-center gap-2 border border-purple-500 hover:bg-purple-500 hover:text-white py-2 px-5"
                  >
                    <MailIcon />
                    <span className="font-dgm">REGISTER</span>
                  </button>
                </form>
              </Form>
            </div>
          </div>
          <div className="font-dgm text-purple-400 mt-5 flex flex-col items-center dashed-border mb-10">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">STEAM으로 회원가입</p>
            <div className="p-2 pb-8">
              <button
                className="p-2 flex items-center justify-center gap-2"
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                onClick={() => steamAuth()}
              >
                <SteamSVG fill={`${submitHover ? '#bdb9f6' : '#8258ff'}`} stroke="" width={48} height={48} />
                <p className={`text-4xl font-black ${submitHover ? 'text-purple-200 glow' : ''}`}>STEAM</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/login">
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
