import { guildUser } from '@/types/guildUser';
import { Avatar } from '../ui/avatar';

export default function Chat(props: guildUser) {
  return (
    <>
      <div className="flex gap-5">
        <Avatar className="bg-neutral-400 aspect-square" />

        <div className='box-content bg-white rounded-lg px-5 py-2'>
          <div className="flex gap-1 ">
            <p className="font-suit text-xs text-neutral-400 font-normal">{props.userTitle}</p>
            <p className="font-suit text-xs text-sky-700 font-bold">{props.name}</p>
          </div>

          <p className="font-suit text-base font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </>
  );
}
