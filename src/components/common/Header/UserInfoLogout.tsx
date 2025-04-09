import { PATH } from '@/constants/routes';
import Link from 'next/link';

type Props = {
  onLogin: () => void;
};

export default function userInfoLogout({ onLogin }: Props) {
  //추후 쿠키나 토큰값 받아와서 처리해주면 됨
  //lib에 auth 함수 같은데서... userInfo = getUserInfo() 혹은 getUserSimpleFromToken() 이런 이름이면 되지 않을까
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
