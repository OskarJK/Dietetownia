import type { Homepage } from "@/lib/api";
import { Hearts, AvocadoIllustration } from "@/components/Decorations";

// Pełne nazwy klas, bo Tailwind nie wykrywa klas składanych dynamicznie
const CARD_STYLES = [
  "bg-sage-light border-sage",
  "bg-blush-light border-blush",
  "bg-avocado-pale border-avocado-light",
  "bg-mint border-sage",
];

export default function Services({ services }: { services: Homepage["services"] }) {
  if (services.length === 0) return null;
  
  return (
    // 1. Dodano klasę "relative", aby absolutne pozycjonowanie odnosiło się do tej sekcji
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16 text-center">
        <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-blush-deep">
          Oferta
        </span>
        <h2 className="font-script text-[clamp(2rem,4vw,3.5rem)] text-peat">Jak mogę Ci pomóc?</h2>
        <div className="mt-3"><Hearts count={5} /></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <div
            key={s.id}
            className={`rounded-3xl border-2 border-dashed p-8 transition-transform hover:-translate-y-1 ${CARD_STYLES[i % CARD_STYLES.length]}`}
          >
            <p className="mb-4 text-3xl">{s.icon}</p>
            <h3 className="mb-3 font-script text-[1.4rem] text-peat">{s.title}</h3>
            <p className="text-sm font-light leading-[1.7] text-bark">{s.description}</p>
          </div>
        ))}
      </div>

      {/* 2. Dodana ilustracja awokado z Twoimi klasami pozycjonującymi */}
      <AvocadoIllustration className="absolute -bottom-10 -right-12 hidden h-40 w-32 lg:block" />
    </section>
  );
}