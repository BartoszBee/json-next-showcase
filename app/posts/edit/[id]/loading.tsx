export default function LoadingEditPost() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-1/3 rounded bg-slate-200" />
      <div className="rounded-lg border bg-white p-4 shadow-sm space-y-4">
        <div className="h-10 rounded bg-slate-100" />
        <div className="h-32 rounded bg-slate-100" />
        <div className="h-10 w-40 rounded bg-slate-200" />
      </div>
      <div className="h-16 rounded bg-red-100" />
    </div>
  );
}