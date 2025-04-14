'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import UserInfoLogin from './UserInfoLogin';
import UserInfoLogout from './UserInfoLogout';
import { useEffect, useState } from 'react';
import LogoAni from '@/assets/main_logo.json';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="-mt-1 w-[124px] h-[36px]"></div>,
});

import { PATH } from '@/constants/routes';
import { useMembers } from '@/api/members';
const linkStyle = `
    relative
    transition-all
    after:absolute
    after:block
    after:content-['']
    after:left-1/2
    after:-bottom-0.5
    after:-translate-x-1/2
    after:h-0.5
    after:transition-all
    after:duration-500
    after:text-purple-450
    after:w-0
    after:ease-in-out
    hover:after:w-full
    hover:after:bg-purple-500
    hover:font-bold
    hover:text-purple-600
    `;

export default function Header() {
  // const user = useAuthStore((state) => state.user);
  const { user, setUser } = useAuthStore();
  const [isLogin, setisLogin] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const member = useMembers();

  useEffect(() => {
    const handleScroll = () => {
      const currScrollY = window.scrollY;
      if (currScrollY > lastScrollY && currScrollY > 68) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (user) {
      setUser(user);
      return;
    }
    // if (!document.cookie.includes('accessToken=')) {
    //   return;
    // }
    const fetchUserInfo = async () => {
      try {
        const userInfo = await member.GetMe();
        if (userInfo) {
          setUser(userInfo);
        } else {
          setUser(undefined);
        }
      } catch {
        setUser(undefined);
      }
    };
    fetchUserInfo();
  }, [user]);

  return (
    <header
      className={`fixed top-0 z-50 w-full bg-white ${showHeader ? 'translate-y-0' : '-translate-y-full'} transition-all`}
      style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px 2px 12px 0px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="wrapper py-5 flex gap-12">
        <h1>
          <Link href="/">
            <Lottie loop animationData={LogoAni} play className="h-9 -mt-1" />
          </Link>
        </h1>
        <div className="grow flex gap-5 text-lg">
          <Link className={linkStyle} href={PATH.party}>
            파티
          </Link>
          <Link className={linkStyle} href={PATH.guild}>
            게임 길드
          </Link>
          <Link className={linkStyle} href={PATH.game}>
            게임 추천
          </Link>
          <Link className={linkStyle} href={PATH.community}>
            커뮤니티
          </Link>
        </div>
        {user && <UserInfoLogin userInfo={user} />}
        {!user && <UserInfoLogout />}
      </div>
    </header>
  );
}
