import type { Homepage } from "@/lib/api";

export default function Stats({ stats }: { stats: Homepage["stats"] }) {
  if (stats.length === 0) return null;
  return (
    <section className="bg-blush-light px-6 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 text-center sm:gap-8">
        {stats.map((s) => (
            <div key={s.id}>
            <p className="font-script text-3xl leading-none text-blush-deep sm:text-5xl">{s.number}</p>
            <p className="mt-1 text-xs text-bark sm:text-sm">{s.label}</p>
            </div>
        ))}
        </div>
    </section>
  );
}