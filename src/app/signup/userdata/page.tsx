'use client';

import { userSchema } from '../userSchema';
import { z } from 'zod';
import '../style.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ChangeEvent, useEffect, useState } from 'react';
import { CoolerCategoryMenu } from './component/cooler-category-menu';
import { userCategories } from '@/types/Tags/userCategories';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useMembers } from '@/api/members';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import typeConverter from '@/utils/typeConverter';
import { uploadToS3 } from '@/utils/uploadToS3';

const userDataSchema = userSchema.pick({
  nickname: true,
  avatar: true,
  gender: true,
  playStyle: true,
  skillLevel: true,
});
type UserDataSchema = z.infer<typeof userDataSchema>;

export default function SignupUserdata() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;

  const { user } = useAuthStore();

  const form = useForm<UserDataSchema>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      nickname: user?.nickname,
      avatar: user?.img_src,
      gender: user?.gender,
      playStyle: user?.party_style,
      skillLevel: user?.skill_level,
    },
  });

  const member = useMembers();
  const router = useRouter();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [dataUrl, setDataUrl] = useState<string | undefined>('');
  const [changeImage, setChangeImage] = useState(false);

  async function onSubmit(data: UserDataSchema) {
    console.log(data);
    const response = await member.PutMe(
      data.nickname,
      changeImage,
      data.avatar ?? '',
      typeConverter('playStyle', 'KoToEn', data.playStyle) ?? 'BEGINNER',
      typeConverter('skillLevel', 'KoToEn', data.skillLevel) ?? 'NEWBIE',
      typeConverter('userGender', 'KoToEn', data.gender) ?? 'MALE'
    );
    if (user && response.success && imageFile) {
      user.nickname = data.nickname;
      user.gender = data.gender;
      user.party_style = data.playStyle;
      user.skill_level = data.skillLevel;

      const s3Response = await uploadToS3(imageFile, response.presignedUrl);
      if (s3Response.success) {
        const imageUrl = s3Response.url;
        console.log('이미지 업로드 완료: ', imageUrl);
        user.img_src = imageUrl;
        await member.profileImg(imageUrl);
      }
    }
    toast({ title: '도전 과제 달성', description: '회원 가입 성공!', variant: 'primary' });
    setTimeout(() => {
      router.push('/');
    }, 500);
  }

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //validation here
      setChangeImage(true);
      setImageFile(e.target.files[0]);
      const fileType = e.target.files[0].type;
      const fileExt = fileType.slice(fileType.indexOf('/') + 1, fileType.length);
      form.setValue('avatar', fileExt);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setDataUrl(reader.result ? reader.result.toString() : '');
      };
    }
  };
  function FileInputBuilder() {
    return (
      <div>
        {!dataUrl && (
          <div className="flex items-center gap-5">
            <div className="border-2 border-purple-500 rounded-full h-14 aspect-square relative"></div>
            <p className="text-purple-500 font-dgm text-2xl glow">아바타 이미지 설정</p>
          </div>
        )}
        {dataUrl && (
          <div className="flex items-center gap-5">
            <div className="border-2 border-purple-500 rounded-full h-14 aspect-square relative overflow-hidden flex items-center justify-center">
              <img src={dataUrl} alt="" className="min-w-[100%] min-h-[100%] object-cover" />
            </div>
            <p className="text-purple-500 font-dgm text-2xl glow">아바타 이미지 변경</p>
          </div>
        )}
      </div>
    );
  }

  const selected = {
    playStyle: useState(new Array(userCategories.playStyle.items.length).fill(false)),
    skillLevel: useState(new Array(userCategories.skillLevel.items.length).fill(false)),
    gender: useState(new Array(userCategories.gender.items.length).fill(false)),
  };
  const selectedArr = Object.values(selected);
  useEffect(() => {
    const selectedValueInd = selected.playStyle[0].findIndex((e) => e);
    const tag = userCategories.playStyle.items[selectedValueInd];
    form.setValue('playStyle', tag);
  }, [selected.playStyle, form]);
  useEffect(() => {
    const selectedValueInd = selected.skillLevel[0].findIndex((e) => e);
    const tag = userCategories.skillLevel.items[selectedValueInd];
    form.setValue('skillLevel', tag);
  }, [selected.skillLevel, form]);
  useEffect(() => {
    const selectedValueInd = selected.gender[0].findIndex((e) => e);
    const tag = userCategories.gender.items[selectedValueInd];
    form.setValue('gender', tag);
  }, [selected.gender, form]);

  const categoryItemStyle =
    'border border-purple-500 text-2xl font-dgm p-2 cursor-pointer hover:text-purple-200 hover:border-purple-200';

  useEffect(() => {
    if (!user || !user.skill_level || !user.party_style || !user.gender) return;
    const indices = [
      userCategories.playStyle.items.findIndex((e) => e === user.party_style),
      userCategories.skillLevel.items.findIndex((e) => e === user.skill_level),
      userCategories.gender.items.findIndex((e) => e === user.gender),
    ];
    const playStyle = [...selected.playStyle[0]];
    playStyle[indices[0]] = true;
    const gender = [...selected.gender[0]];
    gender[indices[2]] = true;
    const skillLevel = [...selected.skillLevel[0]];
    skillLevel[indices[1]] = true;

    selected.playStyle[1](playStyle);
    selected.skillLevel[1](skillLevel);
    selected.gender[1](gender);

    setDataUrl(user.img_src ?? undefined);
  }, []);

  const CategorySelectMenus = () => {
    return (
      <div className="flex flex-col gap-2">
        {Object.values(userCategories).map((category, cat_ind) => (
          <div className="flex items-center" key={`${category.name}`}>
            <p className="text-purple-500 font-dgm text-2xl glow w-[200px]">{category.name}</p>
            <CoolerCategoryMenu
              state={selectedArr[cat_ind][0]}
              setState={selectedArr[cat_ind][1]}
              className="flex gap-2"
              type="single"
              notNull
            >
              {category.items.map((item, item_ind) => (
                <p
                  className={`${categoryItemStyle} ${selectedArr[cat_ind][0][item_ind] ? 'border-purple-200 text-purple-200 glow' : ''}`}
                  key={`${category.name}_${item}`}
                >
                  {item}
                </p>
              ))}
            </CoolerCategoryMenu>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-purple-900 text-purple-400 h-screen flex flex-col items-center mt-[68px]">
      <div className="overlay pointer-events-none"></div>
      <div className="scanline pointer-events-none"></div>
      <div className="scrollanimation">
        <div className="mt-16 flex flex-col pb-10 items-center">
          <div className="flex gap-5 mb-16">
            <div className="">
              <pre className="text-xs glow">{playOnASCII}</pre>
            </div>
            <div>
              <p className="text-2xl font-dgm glow">when we play on together</p>
              <p className="text-2xl font-dgm glow">the game never ends</p>
            </div>
          </div>
          <div className="font-dgm text-purple-400 flex flex-col items-start px-20 dashed-border pb-10 gap-4">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">추가 정보 기입</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <p className="text-purple-500 text-2xl font-dgm glow">{`PlayON의 다양한 기능들은 사용자에 대한 추가적인 정보를 바탕으로 더욱 편리하게 사용할 수 있도록 설계되어 있습니다!`}</p>
                    <p className="text-purple-500 text-2xl font-dgm glow">{`하단의 항목들을 작성하시고 Play ON 하세요!`}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <input
                      type="file"
                      name="avatar_image"
                      id="avatar_image"
                      accept="image/*"
                      onChange={onChangeImage}
                    />
                    <label htmlFor={`avatar_image`} className="cursor-pointer">
                      <FileInputBuilder />
                    </label>
                  </div>
                  <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-5">
                        <p className="font-dgm text-2xl glow">NICKNAME</p>
                        <FormControl>
                          <Input
                            className="border border-purple-500 rounded-none font-dgm !text-xl w-52"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <CategorySelectMenus />
                  <div className="flex gap-5">
                    <button
                      type="submit"
                      className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer"
                      onClick={() => console.log(form.formState.errors)}
                    >{`[ 제출하기 ]`}</button>
                    <p
                      className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer"
                      onClick={() => {
                        router.push('/', { scroll: true });
                      }}
                    >{`[ 다음에 하기 ]`}</p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
