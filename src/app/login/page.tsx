'use client';

import SteamSVG from '@/components/svg/steam';
import './style.css';
import { Input } from '@/components/ui/input';
import { Loader, MailIcon } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PATH } from '@/constants/routes';
import { useMembers } from '@/api/members';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { uploadToS3 } from '@/utils/uploadToS3';

const loginSchema = z.object({
  email: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
});
type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginInitial() {
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
    },
  });
  const [pending, setPending] = useState(false);

  const members = useMembers();
  const router = useRouter();
  const { toast } = useToast();
  const { setUser, setMemberId, memberId } = useAuthStore();

  async function onSubmit(data: LoginSchema) {
    setPending(true);
    const success = await members.login(data.email, data.password);
    setPending(false);

    if (success) {
      const user = await members.GetMe();
      if (user) {
        setUser(user);
        console.log(memberId);
      }
      toast({ title: '로그인 성공!', description: '', variant: 'primary' });
      setTimeout(() => {
        router.push('/', { scroll: true });
      }, 500);
    } else {
      toast({ title: '로그인에 실패하였습니다', description: '아이디와 비밀번호를 확인해주세요', variant: 'primary' });
      setTimeout(() => {
        router.push('/', { scroll: true });
      }, 500);
    }
  }
  async function steamLogin() {
    const response = await members.steamAuthLogin();
    window.location.href = response;
  }

  const [submitHover, setSubmitHover] = useState(false);

  console.log(memberId);

  return (
    <div className="bg-purple-900 text-purple-400 w-full min-h-screen flex flex-col items-center mt-[68px]">
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
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">로그인</p>
            <div className="flex flex-col gap-3 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                    {pending ? <Loader /> : <MailIcon />}
                    <span className="font-dgm">LOGIN</span>
                  </button>
                </form>
              </Form>
            </div>
          </div>
          <div className="font-dgm text-purple-400 mt-5 flex flex-col items-center dashed-border">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">STEAM으로 로그인</p>
            <div className="p-2 pb-8">
              <button
                className="p-2 flex items-center justify-center gap-2"
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                onClick={() => steamLogin()}
              >
                <SteamSVG fill={`${submitHover ? '#bdb9f6' : '#8258ff'}`} stroke="" width={48} height={48} />
                <p className={`text-4xl font-black ${submitHover ? 'text-purple-200 glow' : ''}`}>STEAM</p>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center pb-20">
            <p className="font-dgm text-2xl glow">아이디가 없나요?</p>
            <Link href={PATH.signup} scroll={true}>
              <p className="font-dgm text-2xl glow cursor-pointer hover:text-purple-200">{`[ 회원 가입하러 가기 ]`}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
