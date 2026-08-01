export default function TypingIndicator() {
  return (
    <div
      className="
        absolute
        bottom-3
        left-6
        z-50
        flex
        items-center
        gap-2
        pointer-events-none
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          px-4
          py-3
          flex
          gap-1
          shadow-lg
          border
          border-border
        "
      >
        <span className="typing-dot" />
        <span className="typing-dot delay-150" />
        <span className="typing-dot delay-300" />
      </div>

      <span className="text-xs text-neutral-500 whitespace-nowrap">
        Driver is typing...
      </span>
    </div>
  );
}
