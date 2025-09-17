"use client";

import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={
        className ??
        "rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
      }
      aria-disabled={pending}
    >
      {pending ? "Wysyłanie" : children}
    </button>
  );
}
