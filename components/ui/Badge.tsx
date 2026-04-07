interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "outline";
  className?: string;
}

const variants = {
  default:
    "bg-quattro-primary/20 text-quattro-accent border border-quattro-primary/30",
  accent:
    "bg-quattro-accent/15 text-quattro-accent border border-quattro-accent/30",
  success: "bg-green-500/15 text-green-400 border border-green-500/30",
  outline:
    "bg-transparent text-quattro-text-secondary border border-quattro-border-dark",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
