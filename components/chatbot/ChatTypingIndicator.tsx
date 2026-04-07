export default function ChatTypingIndicator() {
  return (
    <div
      className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm"
      style={{
        background: "rgb(12, 22, 45)",
        border: "1px solid rgba(23, 84, 154, 0.2)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: "rgb(56, 189, 248)",
            animation: "quattro-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes quattro-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
