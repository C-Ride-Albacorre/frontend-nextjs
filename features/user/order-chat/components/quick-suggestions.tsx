'use client';

const QUICK_SUGGESTIONS = [
  'Where are you?',
  'How long until you arrive?',
  'I need help',
  'Can you call me?',
  'Thank you!',
];

type Props = {
  onSelectSuggestion: (message: string) => void;
};

export default function QuickSuggestions({ onSelectSuggestion }: Props) {
  return (
    <div
      className="
        px-6
        py-3
        border-t
        border-border
        bg-foreground-100
        flex
        flex-wrap
        gap-2
      "
    >
      <span className="text-xs text-neutral-500 w-full mb-1">
        Quick replies:
      </span>
      {QUICK_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelectSuggestion(suggestion)}
          className="
            text-xs
            px-3
            py-1.5
            rounded-full
            bg-white
            border
            border-border
            text-neutral-700
            hover:bg-neutral-50
            hover:border-primary
            transition
            cursor-pointer
          "
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
