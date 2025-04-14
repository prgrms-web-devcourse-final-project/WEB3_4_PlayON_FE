'use client';
import { useFreeCommunity } from '@/api/free-community';
import RetroButton from '@/components/common/RetroButton';
import InputImage from '@/components/community/input-image';
import TextEditor from '@/components/community/TextEditor';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PATH } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { communityTags } from '@/types/Tags/communityTags';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const validFileTypes = ['png', 'jpg', 'jpeg', 'webp', ''];

const categoryList = {
  일상: 'DAILY',
  유머: 'HUMOR',
  게임추천: 'GAME_RECOMMEND',
  게임소식: 'GAME_NEWS',
  질문: 'QUESTION',
  파티모집: 'PARTY_RECRUIT',
};

const createCommunityFormSchema = z.object({
  category: z.string().min(1, { message: '태그를 선택해주세요' }),
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  fileType: z.string(),
  content: z.string().min(1, { message: '본문을 작성해주세요' }),
});
type createCommunityFormType = z.infer<typeof createCommunityFormSchema>;

export default function CommunityCreate() {
  const board = useFreeCommunity();
  const router = useRouter();
  const Toast = useToast();

  const form = useForm<createCommunityFormType>({
    defaultValues: {
      category: '',
      title: '',
      fileType: '',
      content: '',
    },
    resolver: zodResolver(createCommunityFormSchema),
    shouldFocusError: true,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const imgFile = e.target.files[0];
    const imgFileType = imgFile.type.split('/')[1];

    if (validFileTypes.includes(imgFileType)) {
      if (form.formState.errors.fileType) {
        form.clearErrors('fileType');
      }
      const url = URL.createObjectURL(imgFile);
      setPreviewUrl(url);
      setImageFile(imgFile);
      form.setValue('fileType', imgFileType);
    } else {
      setPreviewUrl('');
      setImageFile(null);
      form.setError('fileType', {
        type: 'manual',
        message: '지원하지 않는 파일 타입입니다.',
      });
    }
  }

  async function onSubmit(data: createCommunityFormType) {
    Object.assign(data, { category: categoryList[data.category as keyof typeof categoryList] });
    const response = await board.PostCreateWithImg(data, imageFile);
    console.log(response);
    if (response) {
      Toast.toast({
        title: '게시물이 생성되었습니다.',
        variant: 'primary',
      });
    }
    router.push(PATH.community);
  }

  return (
    <div className="wrapper mb-12 mt-28 space-y-10">
      <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl bg-cover bg-center" />
      <div className="text-4xl text-neutral-900 font-bold"> 게시글 작성</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="space-y-7">
            <div className="bg-neutral-50 border border-neutral-300 rounded-2xl px-8 py-6 space-y-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-52 h-12 text-xl px-4 bg-white focus-visible:ring-purple-600 focus:ring-purple-600">
                          <SelectValue
                            placeholder="태그"
                            className="placeholder:!text-neutral-400 focus-visible:ring-purple-600 focus:ring-purple-600"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {communityTags.map((tag) => (
                            <SelectItem key={tag} value={tag} className="text-xl text-neutral-900">
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-purple-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="제목을 입력해주세요"
                        className="!text-xl w-full h-12 bg-white px-4 placeholder:text-neutral-400 focus-visible:ring-purple-600"
                      />
                    </FormControl>
                    <FormMessage className="text-purple-400" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="bg-neutral-50 border border-neutral-300 rounded-2xl px-8 py-6 group overflow-hidden">
            <label className="flex gap-7 items-center ">
              <input type="checkbox" className="hidden peer" />
              <p className="text-2xl text-neutral-900 font-semibold">이미지 첨부하기</p>
              <ChevronDown className="text-neutral-700 peer-checked:rotate-180 transition-transform" />
            </label>
            <FormField
              control={form.control}
              name="fileType"
              render={() => (
                <FormItem
                  className="pt-6 group-has-[input:checked]:opacity-0 group-has-[input:checked]:h-0 group-has-[input:checked]:pt-0 transition-all
                focus-visible:ring-purple-600"
                >
                  <FormControl>
                    <InputImage onChange={(e) => handleImageChange(e)} previewUrl={previewUrl} />
                  </FormControl>
                  <FormMessage className="text-purple-400" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextEditor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-purple-400" />
              </FormItem>
            )}
          />
          <div className="flex gap-8 self-end">
            <RetroButton type="grey" className="w-32" callback={() => router.push(PATH.community)}>
              취소
            </RetroButton>
            <button type="submit" className="self-end" onClick={() => console.log(form.formState.errors)}>
              <RetroButton type="purple" className="w-64">
                등록
              </RetroButton>
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
