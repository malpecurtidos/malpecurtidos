
interface ProductSpecSelectorProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export function ProductSpecSelector({
  label,
  options,
  selectedOption,
  onSelectOption,
}: ProductSpecSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-black">
        {label}:
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectOption(option)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${
              selectedOption === option
                ? "border-[#8B5A2B] bg-[#8B5A2B]/5 text-[#8B5A2B] font-semibold"
                : "border-gray-200 text-black hover:border-[#8B5A2B] hover:text-[#8B5A2B]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
