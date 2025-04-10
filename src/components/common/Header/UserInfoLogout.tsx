import { PATH } from '@/constants/routes';
import Link from 'next/link';

export default function userInfoLogout() {
  return (
    <div className="flex items-center  gap-3">
      <Link href={PATH.login}>
        <p>로그인</p>
      </Link>
      <Link href={PATH.signup}>
        <p>회원가입</p>
      </Link>
    </div>
  );
}
