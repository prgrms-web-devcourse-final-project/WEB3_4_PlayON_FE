'use client';
import { useGuild } from '@/api/guild';
import { useGuildBoard } from '@/api/guildBoard';
import RetroButton from '@/components/common/RetroButton';
import InputImage from '@/components/community/input-image';
import TextEditor from '@/components/community/TextEditor';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PATH } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const validFileTypes = ['png', 'jpg', 'jpeg', 'webp', ''];

const createCommunityFormSchema = z.object({
  tag: z.string().min(1, { message: '태그를 선택해주세요' }),
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
  fileType: z.string(),
  content: z.string().min(1, { message: '본문을 작성해주세요' }),
});
type createCommunityFormType = z.infer<typeof createCommunityFormSchema>;

export default function GuildCommunityCreate() {
  const router = useRouter();
  const guild = useGuild();
  const guildBoard = useGuildBoard();
  const Toast = useToast();
  const params = useParams();
  const guildId = params.guildid as string;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: guildData } = useQuery({
    queryKey: ['guildDetail', params.guildId],
    queryFn: () => guild.GetGuild(guildId),
  });
  console.log(guildData);
  const guildCommunityTagsByRole =
    guildData && guildData.myRole === 'MEMBER' ? ['자유', '게임관련'] : ['공지', '자유', '게임관련'];

  const form = useForm<createCommunityFormType>({
    defaultValues: {
      tag: '',
      title: '',
      fileType: '',
      content: '',
    },
    resolver: zodResolver(createCommunityFormSchema),
    shouldFocusError: true,
  });

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
    const response = await guildBoard.GuildPostCreateWithImg(Number(guildId), data, imageFile);
    console.log(response);
    if (response) {
      Toast.toast({
        title: '게시물이 생성되었습니다.',
        variant: 'primary',
      });
    }
    router.push(PATH.guild_community(guildId));
  }

  return (
    <div className="wrapper mb-12 mt-28 space-y-10">
      <div
        style={{ backgroundImage: `url(${guildData && guildData.img_src})` }}
        className=" w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center bg-neutral-100"
      />

      <div className="text-4xl text-neutral-900 font-bold"> 게시글 작성</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="space-y-7">
            <div className="bg-neutral-50 border border-neutral-300 rounded-2xl px-8 py-6 space-y-3">
              <FormField
                control={form.control}
                name="tag"
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
                          {guildCommunityTagsByRole.map((tag) => (
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
                <FormItem className="pt-6 group-has-[input:checked]:opacity-0 group-has-[input:checked]:h-0 group-has-[input:checked]:pt-0 transition-all focus-visible:ring-purple-600">
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
            <RetroButton type="grey" className="w-32" callback={() => router.push(PATH.guild_community(guildId))}>
              취소
            </RetroButton>
            <button type="submit" onClick={() => console.log(form.formState.errors)}>
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
