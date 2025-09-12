// akcje serwera dla postów
"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { PostCreateSchema } from "./schemas";

function formDataToObject(fd: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of fd.entries()) {
    out[k] = typeof v === "string" ? v : "";
  }
  return out;
}

// tworzenie posta - akcja serwerowa
export async function createPost(formData: FormData) {
  const raw = formDataToObject(formData);
  const parsed = PostCreateSchema.safeParse(raw);
  if (!parsed.success) {
    const issue =
      parsed.error?.issues[0]?.message || "Nieprawidłowe dane formularza";
    throw new Error(issue);
  }
  const data = parsed.data;

  // do API jsonplaceholder
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      title: data.title,
      body: data.body,
      userId: data.userId,
    }),
  });

  if (!res.ok) {
    throw new Error(`Nie udało się utworzyć posta (status ${res.status})`);
  }
  // rewalidacja listy
  revalidateTag("posts");
  // przekierowanie na listę
  redirect("/posts");
}
