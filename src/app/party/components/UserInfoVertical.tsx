interface UserInfoProps {
  isRadioBtn?: boolean;
  data: User;
}

export default function UserInfoVertical({ isRadioBtn = false, data }: UserInfoProps) {
  return (
    <div className="inline-flex items-center gap-2 flex-col">
      <div
        style={{
          backgroundImage: `url(${data.profile_img})`,
        }}
        className="rounded-full bg-center bg-cover w-[100px] h-[100px]"
      />

      <p className="font-suit text-neutral-900 font-bold text-base">{data.username}</p>
    </div>
  );
}
