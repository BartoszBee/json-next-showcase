import { notFound } from "next/navigation";
import Link from "next/link";
import { getJSON } from "@/lib/fetcher";
import type { Post } from "@/types/types";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export const revalidate = 60;

// dynamiczne metadane
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum) || idNum <= 0) {
    return { title: "Post not found" };
  }
  let post: Post | null = null;
  try {
    post = await getJSON<Post>(
      `https://jsonplaceholder.typicode.com/posts/${idNum}`,
      "posts"
    );
  } catch {
    // Błąd sieci — zostaw title domyślne; render przejmie error boundary
  }

  if (!post || !post.id) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.body?.slice(0, 140) ?? "Post details",
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const idNum = Number(id);
  if (!Number.isFinite(idNum) || idNum <= 0) {
    notFound();
  }

  // Równoległe pobranie posta i komentarzy
  const [post, comments] = await Promise.all([
    getJSON<Post>(
      `https://jsonplaceholder.typicode.com/posts/${idNum}`,
      "posts"
    ),
    getJSON<Comment[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${idNum}`,
      "comments"
    ),
  ]);

  // JSONPlaceholder dla nieistniejących ID potrafi zwrócić {} → sprawdzamy .id
  if (!post || !post.id) {
    notFound();
  }

  return (
    <article className="space-y-6">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{post.title}</h1>
          <p className="mt-1 text-sm text-slate-600">
            Post ID: {post.id} • Author (userId): {post.userId}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/posts/edit/${post.id}`}
            className="rounded-lg border px-3 py-2 hover:bg-slate-50"
          >
            Edit
          </Link>
          <Link
            href="/posts"
            className="rounded-lg bg-slate-800 px-3 py-2 text-white hover:bg-slate-900"
          >
            Back to list
          </Link>
        </div>
      </header>

      {/* Treść */}
      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <p className="whitespace-pre-line">{post.body}</p>
      </section>

      {/* Komentarze (prosty listing) */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Comments ({comments.length})</h2>
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="mb-1 text-sm text-slate-500">
                <span className="font-medium">{c.name}</span> • {c.email}
              </div>
              <p className="text-sm">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
