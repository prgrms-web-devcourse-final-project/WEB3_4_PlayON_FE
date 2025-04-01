type TiltToggleProps = {
  toggle: boolean;
  label: string;
};

export default function TiltToggle(props: TiltToggleProps) {
  const toggleOn = 'bg-black text-white font-dgm text-lg py-1 px-2 rotate-6';
  const toggleOff = 'bg-transparent border font-suit border-neutral-400 text-neutral-400 py-1 px-2';

  return (
    <div
      className={`select-none h-full rounded-sm transition-transform duration-200 cursor-pointer ${props.toggle ? toggleOn : toggleOff}`}
    >
      {props.label}
    </div>
  );
}
