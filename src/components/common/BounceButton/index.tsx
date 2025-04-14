import Link from 'next/link';
import styles from './BounceButton.module.css';

type BounceButtonType = 'party' | 'guild' | 'game';

type Props = {
  path: string;
  type: BounceButtonType;
  tootip: string;
};

export default function BounceButton({ path, type, tootip }: Props) {
  let buttonImgSrc = '';

  switch (type) {
    case 'game':
      buttonImgSrc = '/img/3d_object/game_pad.png';
      break;
    case 'guild':
      buttonImgSrc = '/img/3d_object/message.png';
      break;
    case 'party':
      buttonImgSrc = '/img/3d_object/balloon.svg';
      break;
  }

  return (
    <div className="fixed right-6 bottom-4 z-50 animate-bounce delay-150">
      <Link href={path} className="relative group">
        <p
          className={`${styles.chatBubble} opacity-0 translate-y-12 transition-all duration-300 
            text-white text-center font-dgm bg-purple-500 py-2 px-3 shadow-md rounded-lg
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:rotate-6 mb-3 -translate-x-3
        `}
        >
          {tootip}
        </p>
        <img
          className={`group-hover:scale-[120%] transition-all max-w-[98px] max-h-[98px] ${type == 'party' ? 'group-hover:-rotate-[32deg]' : 'group-hover:-rotate-12'}`}
          src={buttonImgSrc}
          alt={`${type} bounce button image`}
        />
      </Link>
    </div>
  );
}
