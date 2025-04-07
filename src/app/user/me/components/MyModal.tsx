'use client';

import SteamSVG from '@/components/svg/steam';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dummyUserDetail, dummyUserSimple } from '@/utils/dummyData';
import { ImageUp, SquarePen } from 'lucide-react';
import {  useRef } from 'react';



export function EditInfo() {
  // if (!isOpen) return null;
  const isSteamToken = '';

  const imageRef = useRef(null);

  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const dummyTitle = ['나한테 바나나?', '달인', '넌 네거야!', '묵찌빠 달인', '매너온도 200', '']

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <SquarePen color="#A3A3A3" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[580px] ">
        <DialogHeader>
          <p>회원정보 수정</p>
        </DialogHeader>


        <div className="flex gap-7">
          <div className="relative">
            <Avatar className="bg-neutral-400 w-24 h-24">
              <AvatarImage src={dummyUserSimple.img_src} />
            </Avatar>
            <div
              className="absolute right-0 top-[70px] bg-white rounded-full w-7 h-7 border border-neutral-200"
              onClick={handleImageClick}
            >
              <input type="file" ref={imageRef} className="hidden" />
              <ImageUp size={24} className="pl-0.5 pt-0.5" color="#a3a3a3" />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="font-suit text-2xl font-semibold text-neutral-400" id="user_title">
                  <SelectValue
                    className="font-suit text-2xl font-semibold text-neutral-400"
                    placeholder={dummyUserSimple.user_title}
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="user_title">AdventureTime!</SelectItem>
                  {dummyTitle.map((title, index) => (
                      <SelectItem key={index} value={"usertitle"[index]}>{title}</SelectItem>
                  ))}
                  {/* <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem> */}
                </SelectContent>
              </Select>
              <p className="font-suit text-2xl font-bold ">{dummyUserSimple.nickname}</p>
            </div>

            <div className="flex gap-8">
              <div className="font-suit text-base font-semibold text-neutral-400 flex">
                스팀 아이디 :&nbsp;
                {isSteamToken ? <div>{dummyUserSimple.username.split('@')[0]}</div> :
                  // <button>Steam ID 연동</button>
                                          <button className='flex flex-row gap-1'>
                                            <SteamSVG fill={'#8258ff'} stroke="" width={24} height={24} />
                                            <p className="text-base font-black text-purple-400">STEAM</p>
                                          </button>
                }
              </div>

              <div className="flex relative">
                <div className="font-suit text-base font-semibold text-neutral-400">성별 : &nbsp;</div>

                <div className="absolute -top-2 left-10">
                  <Select>
                    <SelectTrigger className="font-suit text-base font-semibold text-neutral-400" id="user_title">
                      <SelectValue placeholder={dummyUserDetail.gender} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">
                        남자
                      </SelectItem>
                      <SelectItem value="sveltekit">
                        여자
                      </SelectItem>
                      <SelectItem value="user_title">
                        None
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-[310px]">
              <Label htmlFor="nickname" className="ml-2">
                닉네임
              </Label>
              <Input id="nickname" placeholder={dummyUserSimple.nickname} />
              {/* <Input id="email" type="email" placeholder="m@example.com" required /> */}
            </div>

            <div className="flex items-center gap-3 w-[310px]">
              <Label htmlFor="password">
                비밀번호
              </Label>
              <Input id="password" type="password" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">수정</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
