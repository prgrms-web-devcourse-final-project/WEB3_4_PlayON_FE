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
import { SearchIcon } from 'lucide-react';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { partyTags } from '@/types/Tags/partyTags';
import CategoryMenu from '@/components/common/category-menu';
import SelectedGameCard from '@/components/game/SelectedGameCard';
import { dummyGameSimple } from '@/utils/dummyData';
import { Textarea } from '@/components/ui/textarea';

const createPartyFormSchema = z.object({
  public: z.boolean(),
  name: z.string().min(1).max(50),
  game: z.string().min(1),
  date: z.string().datetime({ offset: true }),
  min_part: z.number().min(2).max(10),
  max_part: z.number().min(2).max(10),
  desc: z.string().min(0).max(100),
  partyStyle: z.array(z.string()),
  skillLevel: z.array(z.string()),
  gender: z.array(z.string()),
  friendly: z.array(z.string()),
});

export default function PartyCreate() {
  const form = useForm<z.infer<typeof createPartyFormSchema>>({
    defaultValues: {
      public: true,
      name: 'ㅁㄴㅇㄹ',
      game: 'ㅁㄴㅇㄹ',
      date: formatISO(new Date()),
      min_part: 2,
      max_part: 10,
      desc: '',
      partyStyle: ['전체'],
      skillLevel: ['전체'],
      gender: ['전체'],
      friendly: ['전체'],
    },
    resolver: zodResolver(createPartyFormSchema),
  });

  function onSubmit(data: z.infer<typeof createPartyFormSchema>) {
    console.log('data : ', data);
  }

  return (
    <div className="mt-12 mb-32">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-6">
            <div className="min-w-[411px] flex flex-col items-end">
              <div className="w-full h-[180px] rounded-2xl border border-neutral-300">
                <SelectedGameCard data={dummyGameSimple} />
              </div>
              <div className="flex items-center gap-2 mt-[25px]">
                <FormField
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg h-10">
                          <Input
                            className={`border-none focus-visible:ring-transparent shadow-none`}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="새싹들의 게임방"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <p className="h2 mt-8">기본 설정</p>
                <p className="h3 mt-5 mb-2">파티할 게임</p>
                <FormField
                  control={form.control}
                  name="game"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg h-10">
                          <SearchIcon className={`text-neutral-400 w-4 h-4`} />
                          <Input
                            className={`border-none focus-visible:ring-transparent shadow-none`}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="제목으로 게임을 검색하세요"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-6 mt-5">
                  <div className="flex flex-col w-[50%] h-9 gap-2">
                    <p className="h3">파티 일정</p>
                    <DateTimePicker onSelect={(date) => date && form.setValue('date', formatISO(date))} />
                  </div>
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
                                    className={`border-none focus-visible:ring-transparent shadow-none`}
                                    value={field.value}
                                    onChange={field.onChange}
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
                                    className={`border-none focus-visible:ring-transparent shadow-none h-9`}
                                    value={field.value}
                                    onChange={field.onChange}
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
                  {Object.values(partyTags).map((e) => (
                    <div className="flex items-center gap-2" key={`${e.name}`}>
                      <p className="w-[118px] font-dgm text-neutral-900">{e.name}</p>
                      <CategoryMenu
                        categoryItems={[...e.items]}
                        categoryName={e.name}
                        onSelect={(newSelected: boolean[]) => {}}
                      />
                    </div>
                  ))}
                </div>
                <p className="h2 mt-8 mb-3">파티 룸 소개</p>
                <FormField
                  control={form.control}
                  name="desc"
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
                <button type="submit" onClick={() => console.log(form.formState.errors)}>
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
