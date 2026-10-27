export function SectionEyebrow({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <p className="mb-8 flex items-center gap-2 text-[13px] text-muted-foreground">
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      {children}
    </p>
  );
}
