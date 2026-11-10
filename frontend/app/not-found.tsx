import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <p className="mb-4 text-5xl">🥑</p>
      <h1 className="mb-3 font-script text-4xl text-peat">Nie znaleziono strony</h1>
      <p className="mb-8 font-light text-bark">Ta strona nie istnieje albo została przeniesiona.</p>
      <Link
        href="/"
        className="inline-block rounded-full bg-avocado px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}