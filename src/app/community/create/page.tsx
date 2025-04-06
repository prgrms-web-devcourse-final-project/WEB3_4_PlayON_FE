import RetroButton from '@/components/common/RetroButton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { communityTags } from '@/types/Tags/communityTags';

export default function CommunityCreate() {
  return (
    <div className="wrapper mb-12 mt-28 flex flex-col gap-10">
      {/* <div className=" bg-[url('/img/hero/bg_community_main.webp')] w-full h-[160px] rounded-2xl mt-12 bg-cover bg-center" /> */}
      <div className="bg-neutral-300 w-full h-[160px] rounded-2xl" />
      <div className="text-4xl text-neutral-900 font-bold"> 게시글 작성</div>
      <div className="space-y-7">
        <div className="bg-neutral-50 rounded-2xl px-8 py-6 space-y-3">
          <Select>
            <SelectTrigger className="w-52 h-12 text-xl px-4 bg-white">
              <SelectValue placeholder="태그" className="placeholder:!text-neutral-400" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {communityTags.map((tag) => (
                  <SelectItem value={tag} className="text-xl text-neutral-900">
                    {tag}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            placeholder="제목을 입력해주세요"
            className="!text-xl w-full h-12 bg-white px-4 placeholder:text-neutral-400"
          />
        </div>
        {/* 여기에 quill */}
      </div>
      <RetroButton type="purple" className="w-64 self-end">
        등록
      </RetroButton>
    </div>
  );
}
