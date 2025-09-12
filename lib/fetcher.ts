// Helper do pobierania JSON w Server Components z obsługą cache tags.
// Daje spójne logowanie błędów i typowanie odpowiedzi.

export async function getJSON<T>(url: string, tag?: string): Promise<T> {
    const res = await fetch(url, {
        // next/cache: tag pozwala później zrobić revalidateTag('...') po mutacjach
        next: tag ? { tags: [tag] } : undefined
    })

    if (!res.ok) {
        // W Server Components rzucamy błąd, trafi do nearest error boundary
        throw new Error(`Request failed: ${res.status} ${res.statusText} for ${url}`)
    }

    return (await res.json()) as T;
}