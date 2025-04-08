'use client';

import { userSchema } from '../userSchema';
import { z } from 'zod';
import './style.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { ChangeEvent, useEffect, useState } from 'react';
import { CoolerCategoryMenu } from './component/cooler-category-menu';
import { userCategories } from '@/types/Tags/userCategories';
import { putMe } from '@/api/members/put-me';

const userDataSchema = userSchema.pick({
  avatar: true,
  gender: true,
  friendly: true,
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
  const form = useForm<UserDataSchema>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      avatar: '',
      friendly: '게임 전용',
      gender: '남자',
      playStyle: '노멀',
      skillLevel: '뉴비',
    },
  });
  function onSubmit(data: UserDataSchema) {
    console.log(data);
  }

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imgExt, setImgExt] = useState('');
  const [dataUrl, setDataUrl] = useState('');
  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      //validation here
      setImageFile(e.target.files[0]);
      const fileType = e.target.files[0].type;
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
        {!imageFile && (
          <div className="flex items-center gap-5">
            <div className="border-2 border-purple-500 rounded-full h-14 aspect-square relative"></div>
            <p className="text-purple-500 font-dgm text-2xl glow">아바타 이미지 설정</p>
          </div>
        )}
        {imageFile && (
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
    friendly: useState(new Array(userCategories.friendly.items.length).fill(false)),
  };
  const selectedArr = Object.values(selected);
  const categoryItemStyle =
    'border border-purple-500 text-2xl font-dgm p-2 cursor-pointer hover:text-purple-200 hover:border-purple-200';
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

  useEffect(() => {}, []);

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
                  <CategorySelectMenus />
                  <div className="flex gap-5">
                    <p
                      className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer"
                      onClick={async () => {
                        putMe({
                          profileImg: 'jpg',
                          nickname: 'asdf',
                          gender: 'MALE',
                          skillLevel: 'NEWBIE',
                          playStyle: 'BEGINNER',
                        });
                      }}
                    >{`[ 제출하기 ]`}</p>
                    <p className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer">{`[ 다음에 하기 ]`}</p>
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
