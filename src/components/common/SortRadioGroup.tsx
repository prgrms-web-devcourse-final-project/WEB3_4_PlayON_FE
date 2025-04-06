export interface SortOption {
  id: string;
  label: string;
}

interface SortRadioGroupProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SortRadioGroup({ options, value, onChange }: SortRadioGroupProps) {
  return (
    <div className="flex gap-7">
      {options.map((option) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            type="radio"
            id={option.id}
            name="sort"
            checked={value === option.id}
            className="hidden peer"
            onChange={() => onChange(option.id)}
          />
          <p className="text-neutral-500 text-2xl peer-checked:text-neutral-900 peer-checked:font-semibold">
            {option.label}
          </p>
        </label>
      ))}
    </div>
  );
}
