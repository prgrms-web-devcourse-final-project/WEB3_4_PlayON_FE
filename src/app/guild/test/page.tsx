'use client';

import { Input } from '@/components/ui/input';
import { uploadToS3 } from '@/utils/uploadToS3';
import { ChangeEvent } from 'react';

export default function Test() {
  const presignedUrl =
    'https://test-bucket.s3.ap-northeast-2.amazonaws.com/guild/6553/f55d1eb1-65d6-44bf-969e-c928e6515c6a.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250410T054741Z&X-Amz-SignedHeaders=host&X-Amz-Credential=test-access-key%2F20250410%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=180&X-Amz-Signature=a567ed389c8cdeed89f3609cd2a99625de1651876ee6a5ef7a016bbea114d107';
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data && data.length > 0) {
      console.log(data[0]);
      const response = await uploadToS3(data[0], presignedUrl);
      console.log(response);
    }
  };
  return (
    <div className="wrapper mt-32">
      <Input type="file" onChange={handleChange} className="w-[500px]" />
    </div>
  );
}
