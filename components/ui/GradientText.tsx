interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function GradientText({
  children,
  className = "",
  as: Tag = "span",
}: GradientTextProps) {
  return <Tag className={`gradient-text ${className}`}>{children}</Tag>;
}
