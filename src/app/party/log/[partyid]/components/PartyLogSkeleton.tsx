// components/PartyLogSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
// import styles from './PartyLogSkeleton.module.css'; // 필요 시 별도 스타일

export default function PartyLogSkeleton() {
  return (
    <Skeleton className="">
      <Skeleton className="w-full h-full absolute top-0 ">
        <Skeleton className=" w-full h-full absolute bottom-0" />
      </Skeleton>

      <Skeleton className="wrapper">
        <Skeleton className="px-16 rounded-3xl relative border border-white">
          <Skeleton className="h-20 mt-4 rounded-md w-full mb-4" />
          <Skeleton className="h-20 mt-4 rounded-md w-2/3 mb-4" />
          <Skeleton className="h-20 mt-4 rounded-md w-1/2 mb-4" />
          <Skeleton className="h-20 mt-4 rounded-md w-1/4 mb-4" />

          <Skeleton className="  py-10 px-16 rounded-3xl relative border border-white mb-6">
            <Skeleton className="h-10 w-1/3  rounded-lg mb-6 mx-auto" />
            <Skeleton className="flex flex-col gap-4">
              <Skeleton className="h-6  rounded-md w-full" />
              <Skeleton className="h-6  rounded-md w-full" />
              <Skeleton className="h-6  rounded-md w-3/4" />
            </Skeleton>
          </Skeleton>
        </Skeleton>
      </Skeleton>
    </Skeleton>
  );
}
