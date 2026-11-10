import { getHomepage } from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import { GreenBlob, AvocadoIllustration } from "@/components/Decorations";

export const metadata = {
  title: "Kontakt — NutriAvocado",
  description: "Skontaktuj się z dietetyczką i umów konsultację.",
};

export default async function KontaktPage() {
  const { profile } = await getHomepage();

  const items = profile
    ? [
        { icon: "📍", label: "Adres", value: profile.address, href: undefined },
        { icon: "📞", label: "Telefon", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
        { icon: "✉️", label: "E-mail", value: profile.email, href: `mailto:${profile.email}` },
        { icon: "🕐", label: "Godziny", value: profile.working_hours, href: undefined },
      ].filter((i) => i.value)
    : [];

  return (
    <>
      <PageHeader title="Kontakt" bgClassName="bg-blush-light" />

      <div className="relative overflow-hidden">
        <GreenBlob className="-left-32 top-10 h-[24rem] w-[24rem]" />
        <AvocadoIllustration className="bottom-8 right-[5%] hidden h-44 w-36 md:block" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-20">
          <h2 className="mb-4 font-script text-3xl text-peat">Skontaktuj się ze mną</h2>
          <p className="mb-10 font-light leading-[1.8] text-bark">
            Masz pytania dotyczące konsultacji, współpracy lub po prostu chcesz porozmawiać o diecie?
            Chętnie odpowiem na każdą wiadomość.
          </p>

          <div className="mb-10 flex flex-col gap-6">
            {items.map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-avocado-pale">
                  {c.icon}
                </div>
                <div>
                  <p className="mb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-avocado">
                    {c.label}
                  </p>
                  {c.href ? (
                    <a href={c.href} className="text-[0.925rem] text-peat hover:underline">{c.value}</a>
                  ) : (
                    <p className="text-[0.925rem] text-peat">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="inline-block rounded-full bg-blush-deep px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Napisz e-mail ♡
            </a>
          )}
        </div>
      </div>
    </>
  );
}