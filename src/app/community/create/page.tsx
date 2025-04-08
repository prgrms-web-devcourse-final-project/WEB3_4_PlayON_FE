'use client';
import RetroButton from '@/components/common/RetroButton';
import InputImage from '@/components/community/input-image';
import TextEditor from '@/components/community/TextEditor';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { communityTags } from '@/types/Tags/communityTags';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createCommunityFormSchema = z.object({
  tag: z.string(),
  title: z.string().min(1),
  image: z.string(),
  content: z.string().min(1),
});
type createCommunityFormType = z.infer<typeof createCommunityFormSchema>;

export default function CommunityCreate() {
  const form = useForm<createCommunityFormType>({
    defaultValues: {
      tag: '',
      title: '',
      image: '',
      content: '',
    },
    resolver: zodResolver(createCommunityFormSchema),
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function onSubmit(data: createCommunityFormType) {
    console.log('data : ', data);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>, onChange: (value: string) => void) {
    const file = e.target.files?.[0];
    if (!file) {
      onChange('');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      const uploadedUrl = await uploadImageToS3(file);
      onChange(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  }

  // 모킹된 이미지 업로드 함수 (나주에 유틸 함수로 빼기)
  const uploadImageToS3 = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      console.log('업로드할 파일:', file);

      // 실제 S3 업로드 대신 딜레이 후 URL 반환
      setTimeout(() => {
        const mockUrl = `https://example-s3-bucket.amazonaws.com/${file.name}`;
        console.log('업로드 성공! URL:', mockUrl);
        resolve(mockUrl);
      }, 1000); // 1초 딜레이 (업로드 시뮬레이션)
    });
  };

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
                name="tag"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-52 h-12 text-xl px-4 bg-white">
                      <SelectValue placeholder="태그" className="placeholder:!text-neutral-400" />
                    </SelectTrigger>
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
                        className="!text-xl w-full h-12 bg-white px-4 placeholder:text-neutral-400"
                      />
                    </FormControl>
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
              name="image"
              render={({ field }) => (
                <FormItem className="pt-6 group-has-[input:checked]:opacity-0 group-has-[input:checked]:h-0 group-has-[input:checked]:pt-0 transition-all">
                  <FormControl>
                    <InputImage onChange={(e) => handleImageChange(e, field.onChange)} previewUrl={previewUrl} />
                  </FormControl>
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
              </FormItem>
            )}
          />

          <button type="submit" className="self-end">
            <RetroButton type="purple" className="w-64">
              등록
            </RetroButton>
          </button>
        </form>
      </Form>
    </div>
  );
}
