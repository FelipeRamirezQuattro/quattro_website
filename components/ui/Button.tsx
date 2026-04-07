import { forwardRef } from "react";

type Variant = "primary" | "ghost" | "outline" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  href?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-quattro-primary hover:bg-quattro-primary-light text-white shadow-[0_0_20px_rgba(23,84,154,0.4)] hover:shadow-[0_0_30px_rgba(23,84,154,0.6)]",
  ghost:
    "bg-transparent border border-quattro-border-dark hover:border-quattro-accent text-quattro-text-secondary hover:text-white",
  outline:
    "bg-transparent border border-quattro-primary text-quattro-primary hover:bg-quattro-primary hover:text-white",
  accent:
    "bg-quattro-accent hover:bg-quattro-accent-2 text-quattro-surface-dark font-semibold",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={`
          inline-flex items-center justify-center gap-2
          font-body font-medium rounded-xl
          transition-all duration-200 cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
