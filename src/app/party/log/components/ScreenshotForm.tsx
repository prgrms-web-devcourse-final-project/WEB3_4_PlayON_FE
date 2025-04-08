'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ChangeEvent, useState } from 'react';
import { EditIcon, ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const screenshotFormSchema = z.object({
  screenshot_img: z
    .any()
    .optional()
    .refine(
      (file) => {
        return !file || file instanceof File;
      },
      { message: '파일 형식이 잘못되었습니다.' }
    ),
  screenshot_comment: z.string(),
});

export default function ScreenshotForm() {
  //Default Form
  const form = useForm<z.infer<typeof screenshotFormSchema>>({
    defaultValues: {
      screenshot_img: '',
      screenshot_comment: '',
    },
    resolver: zodResolver(screenshotFormSchema),
  });

  function onSubmit(data: z.infer<typeof screenshotFormSchema>) {
    console.log('data : ', data);
  }

  //Image Controll
  const [imageFile, setImageFile] = useState<string>('');
  const NoImageInput = () => {
    return (
      <>
        <label
          htmlFor="screenshot_img"
          className="border border-neutral-300 rounded w-1/2 h-48 cursor-pointer bg-neutral-300"
        >
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="text-neutral-400" strokeWidth={1} width={40} height={40} />
          </div>
        </label>
      </>
    );
  };
  const ImageWithChange = () => {
    return (
      <div className="relative h-44 w-1/2 overflow-hidden rounded">
        <img src={imageFile} alt="" />
        <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-25 transition-opacity rounded flex items-start justify-end p-2">
          <label htmlFor="screenshot_img" className="cursor-pointer">
            <EditIcon className="text-white" />
          </label>
        </div>
      </div>
    );
  };
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

  return (
    <div>
      <h4 className="text-xl font-bold mb-2">스크린 샷</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div id="screenshot" className="flex gap-6">
            {imageFile ? <ImageWithChange /> : <NoImageInput />}
            <div className="w-1/2 flex flex-col gap-3 items-end">
              <FormField
                control={form.control}
                name="screenshot_comment"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="bg-white border-neutral-300 placeholder:text-neutral-400"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="스크린샷에 대한 코멘트를 남겨주세요."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="py-5 px-8">추가하기</Button>
            </div>
            <input
              className="hidden"
              type="file"
              name="screenshot_img"
              id="screenshot_img"
              accept="image/*"
              onChange={onChangeImage}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
