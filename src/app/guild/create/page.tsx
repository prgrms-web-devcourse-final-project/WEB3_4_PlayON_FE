'use client';

import './style.css';
import { Switch } from '@/components/ui/switch';
import RetroButton from '@/components/common/RetroButton';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, Form, FormMessage } from '@/components/ui/form';
import { EditIcon, ImageIcon } from 'lucide-react';
import { guildTags } from '@/types/Tags/guildTags';
import SelectedGameCard from '@/components/game/SelectedGameCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { gameSimple } from '@/types/games';
import { useGuild } from '@/api/guild';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/routes';
import { CoolerCategoryMenu } from '@/app/signup/userdata/component/cooler-category-menu';
import TiltToggle from '@/components/common/tilt-toggle';
import { getSteamImage } from '@/api/steamImg';
import GameSearch from '@/components/common/GameSearch';
import { useToast } from '@/hooks/use-toast';

const validFileTypes = ['png', 'jpg', 'jpeg', 'webp', ''];
type FileType = 'png' | 'jpg' | 'jpeg' | 'webp' | '';

const createGuildFormSchema = z.object({
  public: z.boolean(),
  fileType: z.string(),
  name: z
    .string()
    .min(1, { message: '길드 이름은 1글자 이상이어야 합니다.' })
    .max(50, { message: '길드 이름은 50글자 이하여야 합니다.' }),
  limit_people: z
    .number()
    .min(2, { message: '길드 최대 인원은 2명 이상부터 가능합니다.' })
    .max(50, { message: '길드 최대 인원은 50명까지 가능합니다.' }),
  game: z
    .object({
      appid: z.number().min(1),
      name: z.string().min(1),
    })
    .nullish(),
  partyStyle: z.array(z.string()),
  skillLevel: z.array(z.string()),
  gender: z.array(z.string()),
  friendly: z.array(z.string()),
  desc: z
    .string()
    .min(1, { message: '길드 소개는 1글자 이상이어야 합니다.' })
    .max(100, { message: '길드 소개는 100글자 이하이어야 합니다.' }),
});

export default function GuildCreate() {
  const Guild = useGuild();
  const Toast = useToast();
  const form = useForm<z.infer<typeof createGuildFormSchema>>({
    defaultValues: {
      public: true,
      fileType: '',
      name: '',
      limit_people: 10,
      partyStyle: [],
      skillLevel: [],
      gender: [],
      friendly: [],
      desc: '',
    },
    resolver: zodResolver(createGuildFormSchema),
  });

  const partyStyle = useState([true, ...new Array(guildTags.partyStyle.items.length).fill(false)]);
  const skillLevel = useState([true, ...new Array(guildTags.skillLevel.items.length).fill(false)]);
  const gender = useState([true, ...new Array(guildTags.gender.items.length).fill(false)]);
  const friendly = useState([true, ...new Array(guildTags.friendly.items.length).fill(false)]);
  const selectedArr = [partyStyle, skillLevel, gender, friendly];

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<gameSimple | null>(null);

  const router = useRouter();

  const NoImageInput = () => {
    return (
      <>
        <label htmlFor="fileType" className="border border-neutral-300 rounded-lg h-44 cursor-pointer">
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="text-neutral-400" strokeWidth={1} width={40} height={40} />
          </div>
        </label>
      </>
    );
  };
  const ImageWithChange = () => {
    return (
      <div className="relative h-44 overflow-hidden rounded-lg">
        <img src={imageURL} alt="" className="size-full object-cover" />
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-25 transition-opacity rounded flex items-start justify-end p-2">
          <label htmlFor="fileType" className="cursor-pointer">
            <EditIcon className="text-white" />
          </label>
        </div>
      </div>
    );
  };

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

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imgFile = e.target.files[0];
      const imgFileType = e.target.files[0].type.split('/')[1];
      if (validFileTypes.includes(imgFileType)) {
        setImageFile(imgFile);
        form.setValue('fileType', imgFileType);
        console.log(e.target.files[0].type.split('/')[1]);

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
          setImageURL(reader.result ? reader.result.toString() : '');
        };
      } else {
        setImageFile(null);
        setImageURL('');
        form.setError('fileType', {
          type: 'manual',
          message: '지원하지 않는 파일 타입입니다.',
        });
      }
    }
  };

  const transformTags = (type: string, list: string[]) => list.map((value) => ({ type, value }));

  const beforeSubmit = () => {
    if (!partyStyle[0][0]) {
      const PartyStyle = partyStyle[0]
        .slice(1, partyStyle[0].length)
        .map((e, ind) => (e ? guildTags.partyStyle.items[ind] : ''))
        .filter((e) => e);
      // console.log(PartyStyle);
      form.setValue('partyStyle', PartyStyle);
    } else {
      const PartyStyle = ['맛보기', '캐주얼', '노멀', '하드', '익스트림', '도전과제', '스피드러너'];
      form.setValue('partyStyle', PartyStyle);
    }
    if (!skillLevel[0][0]) {
      const SkillLevel = skillLevel[0]
        .slice(1, skillLevel[0].length)
        .map((e, ind) => (e ? guildTags.skillLevel.items[ind] : ''))
        .filter((e) => e);
      // console.log(SkillLevel);
      form.setValue('skillLevel', SkillLevel);
    } else {
      const SkillLevel = ['뉴비', '프로', '해커', '마스터'];
      form.setValue('skillLevel', SkillLevel);
    }
    if (!gender[0][0]) {
      const Gender = gender[0]
        .slice(1, gender[0].length)
        .map((e, ind) => (e ? guildTags.gender.items[ind] : ''))
        .filter((e) => e);
      // console.log(Gender);
      form.setValue('gender', Gender);
    } else {
      const Gender = ['남자만', '여자만'];
      form.setValue('gender', Gender);
    }
    if (!friendly[0][0]) {
      const Friendly = friendly[0]
        .slice(1, friendly[0].length)
        .map((e, ind) => (e ? guildTags.friendly.items[ind] : ''))
        .filter((e) => e);
      // console.log(Friendly);
      form.setValue('friendly', Friendly);
    } else {
      const Friendly = ['친목 환영', '게임 전용', '대화 없음'];
      form.setValue('friendly', Friendly);
    }
  };

  async function onSubmit(data: z.infer<typeof createGuildFormSchema>) {
    console.log('data:', data);

    const tagList = [
      ...transformTags('친목', data.friendly),
      ...transformTags('게임 실력', data.skillLevel),
      ...transformTags('성별', data.gender),
      ...transformTags('파티 스타일', data.partyStyle),
    ];

    const newData = {
      name: data.name,
      description: data.desc,
      maxMembers: data.limit_people,
      appid: data.game?.appid ? data.game?.appid : null,
      // appid: data.game.appid || null,
      isPublic: data.public,
      fileType: data.fileType as FileType,
      tags: tagList,
    };
    // console.log(newData);
    const response = await Guild.CreateGuildWithImg(newData, imageFile);
    console.log(response);
    Toast.toast({
      title: '길드가 생성되었습니다.',
      variant: 'primary',
    });
    router.push(PATH.guild_list);
  }

  useEffect(() => {
    beforeSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyStyle, skillLevel, gender, friendly]);

  return (
    <div className="pt-28 mb-32 flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-6">
            <div className="min-w-[411px] flex flex-col items-end">
              <div className="w-full h-[180px] rounded-2xl border border-neutral-300">
                {selectedGame ? <SelectedGameCard data={selectedGame} /> : <SelectedGameCard />}
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
              <p className="text-sm text-neutral-500">비공개 시 초대장으로만 가입이 가능합니다</p>
            </div>
            <div className="flex flex-col gap-8 px-10 py-10 border border-neutral-300 rounded-2xl w-[52rem]">
              <p className="text-4xl text-neutral-900 font-bold">길드 생성하기</p>
              <div className="flex flex-col gap-4">
                <p>
                  <span className="text-2xl font-bold">대표 이미지</span>{' '}
                  <span className="text-lg font-medium">(선택)</span>{' '}
                  <span className="text-sm text-neutral-500">
                    가로 nnpx 세로 nnpx 이상의 사이즈를 권장합니다. 최대 500kb까지 (확장자: png, jpg, jpeg, webp)
                  </span>
                </p>
                {imageURL ? <ImageWithChange /> : <NoImageInput />}
                <FormField
                  control={form.control}
                  name="fileType"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Input type="file" id="fileType" accept="image/*" onChange={onChangeImage} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            className={`border-none focus-visible:ring-purple-600 shadow-none`}
                            {...field}
                            placeholder="길드 이름을 입력하세요"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
                                type="number"
                                className={`border-none focus-visible:ring-purple-600 shadow-none`}
                                value={Number(field.value)}
                                onChange={(e) => {
                                  field.onChange(Number(e.target.value));
                                }}
                                placeholder="최대 인원을 입력해주세요"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-xs text-neutral-400">최대 인원</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-[30rem]">
                  <p className="h2">
                    <span className="text-neutral-400">게임 제한</span>
                    <span className="text-xs text-neutral-400">(선택)</span>
                  </p>
                  <div className="flex flex-col gap-2">
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="h2">참가 제한 조건</p>
                <div className="flex flex-col bg-neutral-50 rounded-xl gap-5 py-6 px-6">
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
                          className="flex flex-col gap-2 border border-neutral-300 rounded-lg min-h-20 p-2 resize-none focus-visible:ring-purple-600"
                          contentEditable="plaintext-only"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
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
                길드 생성
              </RetroButton>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
