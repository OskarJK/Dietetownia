"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="mb-4 text-5xl">🥑</p>
      <h1 className="mb-3 font-script text-4xl text-peat">Coś poszło nie tak</h1>
      <p className="mb-8 font-light text-bark">
        Nie udało się pobrać danych. Spróbuj ponownie za chwilę.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-avocado px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}