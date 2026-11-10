import Link from "next/link";
import { getRecipes, getRecipeCategories } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";
import PageHeader from "@/components/PageHeader";
import { GreenBlob, AvocadoIllustration } from "@/components/Decorations";

export const metadata = {
  title: "Przepisy — NutriAvocado",
  description: "Proste, smaczne i odżywcze przepisy na każdy tydzień.",
};

export default async function PrzepisyPage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}) {
  const { kategoria } = await searchParams;
  const [recipes, categories] = await Promise.all([getRecipes(kategoria), getRecipeCategories()]);

  const pill = (active: boolean) =>
    `rounded-full border-[1.5px] border-avocado px-5 py-2 text-sm font-medium transition-colors ${
      active ? "bg-avocado text-white" : "text-avocado hover:bg-avocado-pale"
    }`;

  return (
    <>
      <PageHeader
        title="Przepisy"
        subtitle="Proste, smaczne i odżywcze przepisy, które możesz przygotować w każdym tygodniu."
        bgClassName="bg-avocado-pale"
        heartsClassName="text-avocado"
      />

      <div className="relative overflow-hidden">
        <GreenBlob className="-right-32 top-20 h-[26rem] w-[26rem]" />
        <AvocadoIllustration className="bottom-10 left-[3%] hidden h-40 w-32 lg:block" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <Link href="/przepisy" className={pill(!kategoria)}>Wszystkie</Link>
            {categories.map((c) => (
              <Link key={c.id} href={`/przepisy?kategoria=${c.slug}`} className={pill(kategoria === c.slug)}>
                {c.name}
              </Link>
            ))}
          </div>

          {recipes.length === 0 ? (
            <p className="text-center text-bark">Brak przepisów w tej kategorii.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((r) => <RecipeCard key={r.id} recipe={r} large />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}