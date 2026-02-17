
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
      <label className="block text-sm font-medium text-white">
        {label}:
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelectOption(option)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${selectedOption === option
                ? "border-[#967D59] bg-[#967D59]/10 text-[#967D59] font-semibold"
                : "border-zinc-700 text-gray-300 hover:border-[#967D59] hover:text-[#967D59]"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

