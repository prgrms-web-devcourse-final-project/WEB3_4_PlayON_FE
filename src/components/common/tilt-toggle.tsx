type TiltToggleProps = {
  toggle: boolean;
  label: string;
};

export default function TiltToggle(props: TiltToggleProps) {
  const toggleOn = 'bg-black text-white font-dgm text-lg py-1 px-3 rotate-6';
  const toggleOff = 'bg-transparent border font-suit border-neutral-400 text-neutral-400 py-1 px-4';

  return (
    <div
      className={`h-full rounded-sm transition-transform duration-100 flex content-between ${props.toggle ? toggleOn : toggleOff}`}
    >
      {props.label}
    </div>
  );
}
