import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRecipe } from "@/lib/api";
import { LeafLeft, AvocadoIllustration } from "@/components/Decorations";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) return { title: "Nie znaleziono przepisu" };
  return { title: `${recipe.title} — Dietetownia`, description: recipe.description };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);
  if (!recipe) notFound();

  return (
    <div className="relative overflow-hidden">
      <LeafLeft className="left-2 top-10 hidden h-48 w-28 lg:block" />
      <AvocadoIllustration className="bottom-20 right-4 hidden h-40 w-32 lg:block" />

      <article className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <Link href="/przepisy" className="text-sm font-medium text-blush-deep hover:underline">
          ← Wszystkie przepisy
        </Link>

        <div className="mb-4 mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-avocado-pale px-3 py-0.5 text-xs font-medium text-avocado-dark">
            {recipe.category.name}
          </span>
          <span className="text-sm text-bark-light">· {recipe.prep_time} · {recipe.kcal} kcal</span>
        </div>

        <h1 className="mb-6 font-script text-[clamp(2.5rem,5vw,4rem)] leading-tight text-peat">
          {recipe.title}
        </h1>

        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[2rem] border-4 border-white bg-sage-light shadow-lg">
          {recipe.image ? (
            <Image src={recipe.image} alt={recipe.title} fill sizes="896px" className="object-cover" priority unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center text-7xl">🥑</div>
          )}
        </div>

        <p className="mb-10 text-lg font-light leading-[1.8] text-bark">{recipe.description}</p>

        {recipe.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {recipe.tags.map((t) => (
              <span key={t} className="rounded-full bg-blush-light px-3 py-1 text-xs text-bark">{t}</span>
            ))}
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          {recipe.ingredients.length > 0 && (
            <section className="rounded-3xl border-2 border-dashed border-sage bg-sage-light/50 p-8">
              <h2 className="mb-4 font-script text-3xl text-avocado-dark">Składniki</h2>
              <ul className="space-y-2 text-peat">
                {recipe.ingredients.map((i, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-avocado">✓</span>
                    <span>
                      {i.amount && <strong className="font-semibold">{i.amount} </strong>}
                      {i.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {recipe.steps.length > 0 && (
            <section>
              <h2 className="mb-4 font-script text-3xl text-avocado-dark">Przygotowanie</h2>
              <ol className="space-y-5">
                {recipe.steps.map((s, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-avocado text-sm font-semibold text-white">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 font-light leading-[1.7] text-bark">{s.content}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}