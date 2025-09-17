import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { createPost } from "@/lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nowy post",
};

export default function NewPostPage() {
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Nowy post</h1>
        <Link
          href="/posts"
          className="rounded-lg border px-3 py-2 hover:bg-slate-50"
        >
          Wróć do listy
        </Link>
      </header>
      <form
        action={createPost}
        className="space-y-4 rounded-lg border bg-white p-4 shadow-sm"
      >
        <div className="grid gap-1">
          <label htmlFor="title" className="text-sm font-medium">
            Tytuł
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            maxLength={120}
            placeholder="Wpisz tytuł"
            className="rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-slate-500">
            3-120 znaków. Zwięźle i konkretnie.
          </p>
        </div>
        <div className="grid gap-1">
          <label htmlFor="body">Treść</label>
          <textarea
            name="body"
            id="body"
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            placeholder="Wpisz treść"
            className="rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          />
          <p className="text-xs text-slate-500">Minimum 10 znaków</p>
        </div>
        {/* userId trzymam jako hidden z domyślą wartością 1 */}
        <input type="hidden" name="userId" value="1" />
        <div className="flex gap-3">
          <SubmitButton>Utwórz</SubmitButton>
          <Link
            href="/posts"
            className="rounded-lg border px-3 py-2 hover:bg-slate-50"
          >
            Anuluj
          </Link>
        </div>
      </form>
    </section>
  );
}
