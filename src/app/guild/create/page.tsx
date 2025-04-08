'use client';

import './style.css';
import { Switch } from '@/components/ui/switch';
import RetroButton from '@/components/common/RetroButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, Form } from '@/components/ui/form';
import { EditIcon, ImageIcon, SearchIcon } from 'lucide-react';
import CategoryMenu from '@/components/common/category-menu';
import { guildTags } from '@/types/Tags/guildTags';
import SelectedGameCard, { SelectedGameCardSkeleton } from '@/components/game/SelectedGameCard';

import { dummyGameSimple } from '@/utils/dummyData';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

const createGuildFormSchema = z.object({
  public: z.boolean(),
  guild_image: z.string().url(),
  name: z.string().min(1).max(50),
  limit_people: z.number().min(1).max(10),
  game: z.string(),
  partyStyle: z.array(z.string()),
  skillLevel: z.array(z.string()),
  gender: z.array(z.string()),
  friendly: z.array(z.string()),
  desc: z.string(),
});

type GuildCreateProps = {
  id: string;
};

export default function GuildCreate(props: GuildCreateProps) {
  const form = useForm<z.infer<typeof createGuildFormSchema>>({
    defaultValues: {
      public: true,
      guild_image: '',
      name: '',
      limit_people: 10,
      game: '',
      partyStyle: ['전체'],
      skillLevel: ['전체'],
      gender: ['전체'],
      friendly: ['전체'],
      desc: '',
    },
    resolver: zodResolver(createGuildFormSchema),
  });
  const [imageFile, setImageFile] = useState<string>('');

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //validation here
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setImageFile(reader.result ? reader.result.toString() : '');
      };
    }
  };

  async function onSubmit(data: z.infer<typeof createGuildFormSchema>) {
    console.log(data);
  }

  const NoImageInput = () => {
    return (
      <>
        <label htmlFor="guild_image" className="border border-neutral-300 rounded h-44 cursor-pointer">
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="text-neutral-400" strokeWidth={1} width={40} height={40} />
          </div>
        </label>
      </>
    );
  };
  const ImageWithChange = () => {
    return (
      <div className="relative h-44 overflow-hidden rounded">
        <img src={imageFile} alt="" />
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-25 transition-opacity rounded flex items-start justify-end p-2">
          <label htmlFor="guild_image" className="cursor-pointer">
            <EditIcon className="text-white" />
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-28 mb-32 flex justify-center">
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
                <p className="text-xl text-neutral-900 font-medium">길드 공개</p>
              </div>
              <p className="text-sm text-nuetral-500">비공개 시 초대장으로만 가입이 가능합니다</p>
            </div>
            <div className="flex flex-col gap-8 px-10 py-10 border border-neutral-300 rounded-2xl w-[52rem]">
              <p className="text-4xl text-neutral-900 font-bold">길드 생성하기</p>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-2xl font-bold">대표 이미지</span>{' '}
                  <span className="text-xs text-neutral-500">
                    가로 nnpx 세로 nnpx 이상의 사이즈를 권장합니다. 최대 500kb까지
                  </span>
                </p>
                {imageFile ? <ImageWithChange /> : <NoImageInput />}
                <input type="file" name="guild_image" id="guild_image" accept="image/*" onChange={onChangeImage} />
              </div>
              <div className="flex flex-col gap-4">
                <p className="h2">길드 이름</p>
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
                            placeholder="길드 이름을 입력하세요"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-7">
                <div className="flex flex-col gap-4 w-[15rem]">
                  <p className="h2">인원 제한</p>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="limit_people"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-2 border border-neutral-300 rounded-lg h-10">
                              <Input
                                className={`border-none focus-visible:ring-transparent shadow-none`}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="최대 인원을 입력해주세요"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <p className="text-xs text-neutral-400">최대 인원</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-[30rem]">
                  <p className="h2">
                    <span className="text-neutral-400">게임 제한</span>
                    <span className="text-xs text-neutral-400">(선택)</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="game"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-2 border border-neutral-300 rounded-lg h-10 p-2">
                              <Input
                                className={`border-none focus-visible:ring-transparent shadow-none`}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="게임 이름으로 검색하세요"
                              />
                              <SearchIcon width={14} height={14} className="text-neutral-400" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="h2">참가 제한 조건</p>
                <div className="flex flex-col bg-neutral-50 rounded-xl gap-5 py-6 px-6">
                  {Object.values(guildTags).map((e) => (
                    <div className="flex items-center gap-2" key={`${e.name}`}>
                      <p className="w-[118px] font-dgm text-neutral-900">{e.name}</p>
                      <CategoryMenu
                        categoryItems={[...e.items]}
                        categoryName={e.name}
                        onSelect={(newSelected: boolean[]) => {
                          // console.log(newSelected);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="h2">길드 소개</p>
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
            </div>
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
        </form>
      </Form>
    </div>
  );
}
