'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
const reviewFormSchema = z.object({
  review: z.string(),
});

export default function ReviewForm() {
  //Default Form
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    defaultValues: {
      review: '',
    },
    resolver: zodResolver(reviewFormSchema),
  });
  function onSubmit(data: z.infer<typeof reviewFormSchema>) {
    console.log('data : ', data);
  }
  return (
    <div>
      <h4 className="text-xl font-bold mb-2">파티 후기</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormControl>
                <div className="flex flex-col items-end gap-3">
                  <Textarea
                    className="bg-white border-neutral-300 placeholder:text-neutral-400"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="파티 후기를 남겨주세요."
                  />
                  <Button className="py-5 px-8">추가하기</Button>
                </div>
              </FormControl>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
