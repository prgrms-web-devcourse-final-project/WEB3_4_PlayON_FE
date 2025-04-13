'use client';

import './style.css';
import { Switch } from '@/components/ui/switch';
import RetroButton from '@/components/common/RetroButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import SelectedGameCard from '@/components/game/SelectedGameCard';
import { dummyGameSimple } from '@/utils/dummyData';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useParty } from '@/api/party';
import GameSearch from '@/components/common/GameSearch';
import { gameSimple } from '@/types/games';
import { getSteamImage } from '@/api/steamImg';
import { guildTags } from '@/types/Tags/guildTags';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
type ToastError = {
  message: string;
  ref: { name: string };
  type: string;
};
const createPartyFormSchema = z
  .object({
    public: z.boolean(),
    name: z
      .string()
      .min(1, { message: '파티 이름은 1글자 이상이어야 합니다.' })
      .max(50, { message: '파티 이름은 50글자 이하여야 합니다.' }),
    game: z.object({
      appid: z.number().min(1),
      name: z.string().min(1),
    }),
    date: z
      .string()
      .datetime({ offset: true })
      .refine((data) => new Date(data) > new Date(Date.now() + 60 * 60 * 1000), {
        message: '시작 시간은 현재 시각 기준 1시간 이후부터 가능합니다.',
      }),
    min_part: z
      .number()
      .min(2, { message: '파티 최소 인원은 2명부터 가능합니다.' })
      .max(50, { message: '파티 최대 인원은 50명까지 가능합니다.' }),
    max_part: z
      .number()
      .min(2, { message: '파티 최소 인원은 2명부터 가능합니다.' })
      .max(50, { message: '파티 최대 인원은 50명까지 가능합니다.' }),
    description: z.string().max(100).optional(),
    partyStyle: z.array(z.string()),
    skillLevel: z.array(z.string()),
    gender: z.array(z.string()),
    friendly: z.array(z.string()),
  })
  .refine((data) => data.max_part >= data.min_part, {
    message: '최대 인원은 최소 인원보다 같거나 커야 합니다.',
    path: ['max_part'],
  });

export default function PartyCreate() {
  const Toast = useToast();
  const party = useParty();
  const [selectedGame, setSelectedGame] = useState<gameSimple>();
  const dateInputRef = useRef<HTMLInputElement>(null);

  //필터 State
  const partyStyle = useState([true, ...new Array(guildTags.partyStyle.items.length).fill(false)]);
  const skillLevel = useState([true, ...new Array(guildTags.skillLevel.items.length).fill(false)]);
  const gender = useState([true, ...new Array(guildTags.gender.items.length).fill(false)]);
  const friendly = useState([true, ...new Array(guildTags.friendly.items.length).fill(false)]);
  const selectedArr = [partyStyle, skillLevel, gender, friendly];

  //핸들러
  const handleSelectedGame = async (data: { appid: string; name: string }) => {
    const imgsrc = await getSteamImage(data.appid, 'header');
    const bgsrc = await getSteamImage(data.appid, 'background');

    setSelectedGame({
      title: data.name,
      genre: [''],
      img_src: imgsrc,
      background_src: bgsrc,
    });
  };
  const form = useForm<z.infer<typeof createPartyFormSchema>>({
    defaultValues: {
      name: '',
      public: true,
      min_part: 2,
      max_part: 50,
      partyStyle: ['전체'],
      skillLevel: ['전체'],
      gender: ['전체'],
      friendly: ['전체'],
    },
    resolver: zodResolver(createPartyFormSchema),
    shouldFocusError: true,
  });

  async function onSubmit(data: z.infer<typeof createPartyFormSchema>) {
    type GuildTagValue = (typeof guildTags)[keyof typeof guildTags]['items'][number];

    const selectedTagsFlat: { type: string; value: GuildTagValue }[] = Object.entries(guildTags).flatMap(
      ([key, category], index) => {
        const selected = selectedArr[index][0]; // boolean[]
        return selected
          .map((isSelected, i) => {
            if (i === 0 || !isSelected) return null;
            return {
              type: category.name,
              value: category.items[i - 1] as GuildTagValue,
            };
          })
          .filter((v): v is { type: string; value: GuildTagValue } => v !== null);
      }
    );
    const reqData = {
      name: data.name,
      description: data.description || '',
      partyAt: new Date(data.date),
      tags: selectedTagsFlat,
      appId: data.game.appid,
      minimum: data.min_part,
      maximum: data.max_part,
      isPublic: data.public,
    };
    await party.CreateParty(reqData);
  }

  function errorHandler(err: object) {
    console.log('error handler catched', err);
    const firstError: ToastError = Object.values(err)[0];
    if (firstError.ref?.name == 'date') dateInputRef.current?.focus();
    if (firstError.message == 'Required') return;
    Toast.toast({
      className: cn('border-cherry-main text-cherry-main'),
      title: '파티 생성에 실패했습니다.',
      description: firstError.message,
    });
  }

  return (
    <div className="pt-28 mb-32">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            (data) => onSubmit(data),
            (error) => errorHandler(error)
          )}
        >
          <div className="flex justify-center gap-6">
            <div className="min-w-[411px] flex flex-col items-end">
              <div className="w-full h-[180px] rounded-2xl border border-neutral-300">
                {selectedGame && <SelectedGameCard data={selectedGame} />}
              </div>
              <div className="flex items-center gap-2 mt-[25px]">
                <FormField //공개설정
                  control={form.control}
                  name="public"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p className="text-xl text-neutral-900 font-medium">파티 룸 공개</p>
              </div>
              <p className="text-sm text-nuetral-500">파티 룸 공개시 길드원이 아닌 인원도 참여 가능합니다.</p>
            </div>
            <div className="flex flex-col">
              <div className="w-[845px] border border-neutral-300 rounded-xl py-14 px-10">
                <p className="h1 mb-4">파티 룸 이름</p>
                <FormField //파티룸이름
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg h-10">
                          <Input
                            className={`border-none focus-visible:ring-purple-600 shadow-none`}
                            {...field}
                            placeholder="파티 이름을 지어주세요."
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p className="h2 mt-8">기본 설정</p>
                <p className="h3 mt-5 mb-2">파티할 게임</p>
                <FormField //게임 제목
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Input
                            className={`border-none shadow-none focus-visible:ring-0 opacity-0 absolute sr-only`}
                            {...field}
                            value={typeof field.value === 'object' && field.value?.appid ? field.value.appid : ''}
                          />
                          <GameSearch
                            onSelect={(game) => {
                              handleSelectedGame(game);
                              field.onChange(game);
                            }}
                          />
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-6 mt-5">
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col w-full gap-2 relative">
                            <p className="h3">파티 일정</p>
                            <Input
                              type="text"
                              className="absolute w-0 h-0 opacity-0 pointer-events-none peer"
                              ref={dateInputRef}
                              value={''}
                              readOnly
                            />
                            <div className="rounded-md ring-1 ring-transparent peer-focus:ring-1 peer-focus:ring-purple-600 transition">
                              <DateTimePicker onSelect={(date) => date && form.setValue('date', formatISO(date))} />
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col w-[50%] gap-2">
                    <p className="h3">파티 인원수</p>
                    <div className="flex gap-6">
                      <FormField
                        control={form.control}
                        name="min_part"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col h-9 gap-2">
                                <div className="flex flex-col gap-2 border border-neutral-300 rounded-lg h-10">
                                  <Input
                                    type="number"
                                    className={`border-none focus-visible:ring-purple-600 shadow-none`}
                                    {...field}
                                    value={Number(field.value)}
                                    onChange={(e) => {
                                      field.onChange(Number(e.target.value));
                                    }}
                                  />
                                </div>
                                <p className="text-sm text-neutral-400">최소 인원</p>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="max_part"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col h-9 gap-2">
                                <div className="flex flex-col gap-2 border border-neutral-300 rounded-lg h-10">
                                  <Input
                                    type="number"
                                    className={`border-none focus-visible:ring-purple-600 shadow-none h-9`}
                                    {...field}
                                    value={Number(field.value)}
                                    onChange={(e) => {
                                      field.onChange(Number(e.target.value));
                                    }}
                                  />
                                </div>
                                <p className="text-sm text-neutral-400">최대 인원</p>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <p className="h2 mt-8">참가 제한 조건</p>
                <div className="flex flex-col bg-neutral-50 rounded-xl mt-5 gap-5 py-10 px-10">
                  {Object.values(guildTags).map((category, cat_ind) => (
                    <div className="flex items-center gap-5" key={`${category.name}`}>
                      <p className="w-[118px] font-dgm text-neutral-900">{category.name}</p>
                      <CoolerCategoryMenu
                        state={selectedArr[cat_ind][0]}
                        setState={selectedArr[cat_ind][1]}
                        className="flex gap-2"
                        type="multiple"
                        enableAll
                        notNull
                      >
                        {['전체', ...category.items].map((item, item_ind) => (
                          <TiltToggle
                            label={item}
                            toggle={selectedArr[cat_ind][0][item_ind]}
                            key={`${category.name}_${item}`}
                          />
                        ))}
                      </CoolerCategoryMenu>
                    </div>
                  ))}
                </div>
                <p className="h2 mt-8 mb-3">파티 룸 소개</p>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="flex flex-col gap-2 border border-neutral-300 rounded-lg min-h-20 p-2 resize-none"
                          contentEditable="plaintext-only"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end mt-11 gap-3">
                <button className="bg-neutral-400 text-white rounded-full w-32 mt-2 h-12 hover:bg-neutral-600 transition-colors">
                  취소
                </button>
                <button type="submit">
                  <RetroButton type="purple" className="w-60 h-12">
                    파티 생성
                  </RetroButton>
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
