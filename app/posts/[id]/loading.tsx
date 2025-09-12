export default function LoadingPost() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-2/3 rounded bg-slate-200" />
      <div className="h-4 w-1/2 rounded bg-slate-200" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="h-24 rounded bg-slate-100" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="h-16 rounded bg-slate-100" />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="h-16 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}