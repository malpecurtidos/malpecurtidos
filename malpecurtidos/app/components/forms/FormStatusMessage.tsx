type FormStatusMessageProps = {
  tone: "success" | "error";
  message: string;
};

export function FormStatusMessage({ tone, message }: FormStatusMessageProps) {
  const palette =
    tone === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  const icon =
    tone === "success" ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    );

  return (
    <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-sans ${palette}`}>
      <span className="shrink-0 mt-0.5">{icon}</span>
      <p>{message}</p>
    </div>
  );
}
