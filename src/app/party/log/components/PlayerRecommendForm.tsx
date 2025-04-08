'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { partyLog } from '@/types/party';
import UserInfoVertical from '../../components/UserInfoVertical';

const playerRecommendSchema = z.object({
  recommend: z.string(),
});

type Props = {
  partyLog: partyLog;
};

export default function PlayerRecommendForm({ partyLog }: Props) {
  const form = useForm<z.infer<typeof playerRecommendSchema>>({
    defaultValues: {
      recommend: '',
    },
    resolver: zodResolver(playerRecommendSchema),
  });
  function onSubmit(data: z.infer<typeof playerRecommendSchema>) {
    console.log('data : ', data);
  }
  return (
    <div>
      <h4 className="text-xl font-bold mb-3">플레이어 추천</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="recommend"
            render={({ field }) => (
              <FormControl>
                <div className="flex gap-2">
                  {partyLog.party_info.participation.map((member, idx) => (
                    <div key={idx} className="cursor-pointer">
                      <UserInfoVertical
                        isRadioBtn
                        name="recommend"
                        data={member}
                        onSelected={() => {
                          field.onChange(member.username);
                          form.handleSubmit(onSubmit)();
                        }}
                      ></UserInfoVertical>
                    </div>
                  ))}
                </div>
              </FormControl>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
