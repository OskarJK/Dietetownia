import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-blush-light px-6 py-24 text-center">
      <h2 className="mb-4 font-script text-[clamp(2rem,4vw,3.5rem)] text-peat">Gotowa/y na zmianę?</h2>
      <p className="mx-auto mb-8 max-w-md font-light leading-[1.7] text-bark">
        Porozmawiajmy o Twoich celach i stwórzmy plan razem.
      </p>
      <Link href="/kontakt" className="inline-block rounded-full bg-blush-deep px-10 py-4 text-[0.9rem] font-semibold text-white transition-opacity hover:opacity-90">
        Skontaktuj się ♡
      </Link>
    </section>
  );
}