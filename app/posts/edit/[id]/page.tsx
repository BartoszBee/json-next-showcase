import Link from "next/link";
import { notFound } from "next/navigation";
import { getJSON } from "@/lib/fetcher";
import { updatePost, deletePost } from "@/lib/actions";
import type { Post } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Edycja posta" };
export const revalidate = 60;

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const idNum = Number(params.id);
  if (!Number.isFinite(idNum) || idNum <= 0) notFound();

  const post = await getJSON<Post>(
    `https://jsonplaceholder.typicode.com/posts/${idNum}`,
    "posts"
  );
  if (!post || !post.id) notFound();

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edycja posta</h1>
        <Link
          href={`/posts/${post.id}`}
          className="rounded-lg border px-3 py-2 hover:bg-slate-50"
        >
          Podgląd
        </Link>
      </header>
      <form
        action={updatePost}
        className="space-y-4 rounded-lg border bg-white p-4 shadow-sm"
      >
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="userId" value={post.userId} />

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
            defaultValue={post.title}
            className="rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="body" className="text-sm font-medium">
            Treść
          </label>
          <textarea
            id="body"
            name="body"
            required
            minLength={10}
            maxLength={5000}
            rows={8}
            defaultValue={post.body}
            className="rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
          >
            Zapisz zmiany
          </button>
          <Link
            href="/posts"
            className="rounded-lg border px-3 py-2 hover:bg-slate-50"
          >
            Anuluj
          </Link>
        </div>
      </form>

      <form
        action={deletePost}
        className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm"
      >
        <input type="hidden" name="id" value={post.id} />
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-800">
            Usunięcie posta jest nieodwracalne (w JSONPlaceholder i tak to
            mock).
          </p>
          <button
            type="submit"
            className="rounded bg-red-700 px-3 py-2 text-white hover:bg-red-800 cursor-pointer"
          >
            Usuń post
          </button>
        </div>
      </form>
    </section>
  );
}
