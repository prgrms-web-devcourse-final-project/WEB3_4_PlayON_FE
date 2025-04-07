'use client';
import RetroButton from '@/components/common/RetroButton';
import TextEditor from '@/components/community/TextEditor';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { communityTags } from '@/types/Tags/communityTags';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createCommunityFormSchema = z.object({
  tag: z.string().default(''),
  title: z.string().default(''),
  content: z.string().default(''),
});
type createCommunityFormType = z.infer<typeof createCommunityFormSchema>;

export default function CommunityCreate() {
  const form = useForm<createCommunityFormType>({
    resolver: zodResolver(createCommunityFormSchema),
  });

  function onSubmit(data: createCommunityFormType) {
    console.log('data : ', data);
  }

  return (
    <div className="wrapper mb-12 mt-28 space-y-10">
      <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl bg-cover bg-center" />
      <div className="text-4xl text-neutral-900 font-bold"> 게시글 작성</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="space-y-7">
            <div className="bg-neutral-50 rounded-2xl px-8 py-6 space-y-3">
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
                        placeholder="제목을 입력해주세요"
                        className="!text-xl w-full h-12 bg-white px-4 placeholder:text-neutral-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
