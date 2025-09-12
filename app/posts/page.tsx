// Lista postów jako Server Component (RSC) z cache tagiem "posts".

import Link from "next/link";
import { getJSON } from "@/lib/fetcher";
import type { Post } from "@/types/types";

// ISR dla całej strony (fallback, nie koliduje z tagami)
export const revalidate = 60;

export default async function PostsPage() {
  // Pobranie 20 postów
  const posts = await getJSON<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=20",
    "posts"
  );

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link
          href="/posts/new"
          className="rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700"
        >
          New Post
        </Link>
      </header>
      <ul className="grid md:grid-cols-2 gap-4">
        {posts.map((p) => (
          <li key={p.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <h2 className="font-medium mb-2 line-clamp-1">{p.title}</h2>
            <p className="text-sm text-slate-600 line-clamp-2">{p.body}</p>
            <div className="mt-3 flex gap-3">
              <Link
                href={`/posts/${p.id}`}
                className="text-sky-700 hover:underline"
              >
                Details
              </Link>
              <Link
                href={`/posts/edit/${p.id}`}
                className="text-red-700 hover:underline"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
