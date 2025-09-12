import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Post nie został znaleziony</h2>
      <p className="text-slate-600">
        Wygląda na to, że wskazany post nie istnieje lub został usunięty.
      </p>
      <Link
        href="/posts"
        className="inline-block rounded bg-slate-800 px-3 py-2 text-white hover:bg-slate-900"
      >
        Wróć do listy postów
      </Link>
    </div>
  );
}
