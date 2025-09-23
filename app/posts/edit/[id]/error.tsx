
"use client";

export default function EditPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-800">Błąd formularza</h2>
      <p className="text-sm text-red-700">
        {error.message || "Operacja nie powiodła się."}
      </p>
      <button
        onClick={reset}
        className="rounded bg-red-700 px-3 py-2 text-white hover:bg-red-800"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}