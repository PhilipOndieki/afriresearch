export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <span className="font-serif text-display-sm text-foreground">Insight AfriResearch</span>
        <div className="w-16 h-px bg-foreground animate-pulse" />
      </div>
    </div>
  );
}
