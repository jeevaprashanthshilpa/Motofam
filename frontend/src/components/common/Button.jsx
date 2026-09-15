export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  const baseStyles =
    "px-4 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-surface-primary hover:bg-surface-primaryHover text-white shadow-sm",
    outline:
      "border border-surface-border text-surface-text hover:bg-neutral-100 dark:hover:bg-neutral-800",
    secondary:
      "bg-neutral-200 dark:bg-neutral-800 text-surface-text hover:bg-neutral-300 dark:hover:bg-neutral-700",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}