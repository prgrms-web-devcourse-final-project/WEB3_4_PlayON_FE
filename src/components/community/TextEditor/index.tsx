'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { cn } from '@/lib/utils';
import './style.css';
import { Skeleton } from '@/components/ui/skeleton';

// 서버에서는 실행되지 않도록 dynamic import
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false, loading: () => <TextEditorSkeleton /> });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TextEditorSkeleton() {
  return (
    <div className="h-[434px] w-full rounded-xl border border-[hsl(0 0% 89.8%)] overflow-hidden">
      <Skeleton className="w-full h-[52px] bg-neutral-50 rounded-none border-b border-[hsl(0 0% 89.8%)]" />
    </div>
  );
}

export default function TextEditor({ value, onChange, className }: TextEditorProps) {
  // 리렌더링 될 때마다 옵션이 새로 생성되는 것을 막기 위함
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
      ],
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder="내용을 입력하세요"
      className={className}
    />
  );
}
