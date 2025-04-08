'use client';
import RetroButton from '@/components/common/RetroButton';
import Chat from '@/components/guildUser/Chat';
import { Avatar } from '@/components/ui/avatar';
import { dummyParty } from '@/utils/dummyData';
import { loremIpsum } from '@/utils/loremIpsum';
import { useState } from 'react';
export default function InfoChatting() {
  const [chatting, setChatting] = useState(false);
  function getButtonLabel(participating: boolean) {
    if (participating) return '채팅 퇴장하기';
    return '채팅 참여하기';
  }
  return (
    <div className="border-t border-white/20 pt-8">
      <div id="participatedInfomation" className="flex justify-between items-center">
        <div>
          <h5 className="text-xl font-extrabold">채팅 참가 중</h5>
          <div className="flex py-2 justify-between">
            <div className="flex gap-2 items-center">
              {dummyParty.participation.map((member, idx) =>
                idx < 8 ? (
                  <Avatar
                    key={idx}
                    style={{
                      backgroundImage: `url(${member.img_src})`,
                    }}
                    className="bg-cover bg-center w-10 h-10"
                  />
                ) : null
              )}
              {dummyParty.participation.length - 8 >= 1 && (
                <div className="font-suit text-lg font-semibold ml-2 text-neutral-600">
                  +{dummyParty.participation.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>
        <RetroButton
          type="purple"
          callback={() => {
            setChatting(!chatting);
          }}
        >
          {getButtonLabel(chatting)}
        </RetroButton>
      </div>
      {chatting && (
        <div
          id="chattingRoom"
          className="bg-neutral-500/20 p-12 rounded-xl max-h-[680px] overflow-y-scroll mt-6 gap-y-3 flex flex-col"
        >
          {dummyParty.participation.map((member) => (
            <Chat data={member} message={member.user_title} isSender={member.nickname == '홍길동'} />
          ))}
          {dummyParty.participation.map((member) => (
            <Chat data={member} message={loremIpsum} isSender={member.nickname == '홍길동'} />
          ))}
          {dummyParty.participation.map((member) => (
            <Chat data={member} message={member.user_title} isSender={member.nickname == '홍길동'} />
          ))}
          {dummyParty.participation.map((member) => (
            <Chat data={member} message={member.user_title} isSender={member.nickname == '홍길동'} />
          ))}
        </div>
      )}
    </div>
  );
}
