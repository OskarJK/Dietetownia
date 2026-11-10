import type { Homepage } from "@/lib/api";
import { GreenBlob, AvocadoIllustration } from "@/components/Decorations";

export default function Assurances({ items }: { items: Homepage["assurances"] }) {
  if (items.length === 0) return null;
  return (
    <section className="relative overflow-hidden bg-sage-light px-6 py-20">
      <AvocadoIllustration className="bottom-10 left-[3%] hidden h-40 w-32 lg:block" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-script text-[clamp(2rem,4vw,3.5rem)] text-avocado-dark">
          Zapewniam, że:
        </h2>
        <div className="rounded-[1.75rem] border-2 border-dashed border-sage bg-white/65 px-8 py-10 backdrop-blur-sm md:px-12">
          <div className="grid gap-x-12 gap-y-4 md:grid-cols-2">
            {items.map((a) => (
              <div key={a.id} className="flex items-start gap-2.5">
                <span className="mt-0.5 shrink-0 font-bold text-avocado">✓</span>
                <p className="text-[0.9rem] leading-relaxed text-peat">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}