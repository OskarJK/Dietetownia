import type { Homepage } from "@/lib/api";
import { Hearts, LeafLeft } from "@/components/Decorations";
import Image from "next/image";

export default function About({
  profile,
  points,
}: {
  profile: Homepage["profile"];
  points: Homepage["about_points"];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <LeafLeft className="-left-8 -top-8 z-10 h-40 w-24" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-avocado-pale">
              {profile?.about_photo ? (
                <Image
                  src={profile.about_photo}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">🥑</div>
              )}
            </div>
        </div>

        <div>
          <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-avocado">
            O mnie
          </span>
          <h2 className="mb-6 font-script text-[clamp(2.2rem,3.5vw,3.5rem)] leading-[1.15] text-peat">
            Dlaczego to ważne?
          </h2>

          <div className="mb-8 flex flex-col gap-5">
            {points.map((p) => (
              <div key={p.id} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-avocado-pale">
                  {p.icon}
                </div>
                <p className="mt-1 font-light leading-[1.7] text-bark">
                  <strong className="font-semibold text-peat">{p.title}</strong> {p.description}
                </p>
              </div>
            ))}
          </div>

          <Hearts count={5} />
          {profile && <p className="mt-2 text-xs italic text-bark-light">{profile.name}, dietetyczka</p>}
        </div>
      </div>
    </section>
  );
}