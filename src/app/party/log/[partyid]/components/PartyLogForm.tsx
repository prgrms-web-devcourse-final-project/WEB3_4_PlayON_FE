'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { EditIcon, ImageIcon } from 'lucide-react';
import UserInfoVertical from '@/app/party/components/UserInfoVertical';
import { usePartyLog } from '@/api/partyLog';
import { useParams } from 'next/navigation';
import { uploadToS3 } from '@/utils/uploadToS3';
import { PartyLogProps } from '../parsePartyLogData';

const partyLogFormSchema = z.object({
  fileType: z.string().nullish(),
  comment: z.string(),
  content: z.string(),
  partyMemberId: z.string().min(1, '추천할 플레이어를 선택해주세요'),
});

type Props = {
  partyLog: PartyLogProps;
};

export default function PartyLogForm({ partyLog }): Props {
  const params = useParams();
  const partyid = params?.partyid as string;
  const partyLogApi = usePartyLog();
  const [imageFile, setImgFile] = useState<File | undefined>(undefined);

  const form = useForm<z.infer<typeof partyLogFormSchema>>({
    defaultValues: {
      comment: '',
      content: '',
      fileType: null,
      partyMemberId: '',
    },
    resolver: zodResolver(partyLogFormSchema),
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    const fileExt = file.type.slice(file.type.indexOf('/') + 1, file.type.length);
    console.log(fileExt);
    form.setValue('fileType', fileExt); // 예: image/jpeg
  };

  const onSubmit = async (data: z.infer<typeof partyLogFormSchema>) => {
    try {
      const response = await partyLogApi.CreatePartyLog(partyid, {
        comment: data.comment,
        content: data.content,
        fileType: data.fileType ?? '',
        partyMemberId: data.partyMemberId,
      });

      console.log('create', response);
      const { logId, partyId, presignedUrl } = response?.data?.data ?? {};
      if (!logId || !presignedUrl) {
        return;
      }

      if (imageFile) {
        const uploadResult = await uploadToS3(imageFile, presignedUrl);
        console.log('s3', uploadResult);

        if (uploadResult.success && uploadResult.url) {
          const screenshotres = await partyLogApi.SaveScreenshot(String(logId), String(partyId), uploadResult.url);
          console.log('screenshotres', screenshotres);
        } else {
          return;
        }
      }
    } catch (error) {
      console.error('파티 로그 작성 중 오류 발생:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8">
          {/* 스크린샷 */}
          <div>
            <h4 className="text-xl font-bold mb-2">스크린 샷</h4>
            <div className="flex gap-6">
              {imagePreview ? (
                <div className="relative h-44 w-1/2 overflow-hidden rounded">
                  <img src={imagePreview} alt="스크린샷 미리보기" />
                  <div className="absolute w-full h-full top-0 left-0 bg-black opacity-0 hover:opacity-25 transition-opacity rounded flex items-start justify-end p-2">
                    <label htmlFor="screenshot_img" className="cursor-pointer">
                      <EditIcon className="text-white" />
                    </label>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="screenshot_img"
                  className="border border-neutral-300 rounded w-1/2 h-48 cursor-pointer bg-neutral-300"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="text-neutral-400" strokeWidth={1} width={40} height={40} />
                  </div>
                </label>
              )}
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          className="bg-white border-neutral-300 placeholder:text-neutral-400 h-48"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="스크린샷에 대한 코멘트를 남겨주세요."
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <input className="hidden" type="file" id="screenshot_img" accept="image/*" onChange={onChangeImage} />
            </div>
          </div>

          {/* 파티 후기 */}
          <div>
            <h4 className="text-xl font-bold mb-2">파티 후기</h4>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormControl>
                  <div className="flex flex-col items-end gap-3">
                    <Textarea
                      className="bg-white border-neutral-300 placeholder:text-neutral-400"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="파티 후기를 남겨주세요."
                    />
                  </div>
                </FormControl>
              )}
            />
          </div>

          {/* 플레이어 추천 */}
          <div>
            <h4 className="text-xl font-bold mb-3">플레이어 추천</h4>
            <FormField
              control={form.control}
              name="partyMemberId"
              render={({ field }) => (
                <FormControl>
                  <div className="flex gap-2">
                    {partyLog?.party_info.participation.map((member, idx) => {
                      return (
                        <div key={idx} onClick={() => field.onChange(member.partyMemberId)}>
                          <UserInfoVertical isRadioBtn name={field.name} data={member} onSelected={field.onChange} />
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
              )}
            />
          </div>

          {/* 로그 남기기 버튼 */}
          <div className="flex justify-end">
            <Button className="py-5 px-8" type="submit">
              로그 남기기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
