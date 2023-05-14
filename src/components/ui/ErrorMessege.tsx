export function ErrorMessage({
  className,
  message,
}: {
  className?: string;
  message: string;
}) {
  return (
    <h1 className={`mt-2 text-sm text-red-500 ${className}`}>{message}</h1>
  );
}
