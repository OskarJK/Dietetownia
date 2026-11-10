import Link from "next/link";
import type { RecipeListItem } from "@/lib/api";
import RecipeCard from "@/components/RecipeCard";

export default function FeaturedRecipes({ recipes }: { recipes: RecipeListItem[] }) {
  if (recipes.length === 0) return null;
  return (
    <section className="bg-beige-warm px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-avocado">Przepisy</span>
            <h2 className="font-script text-[clamp(2rem,3.5vw,3rem)] text-peat">Zainspiruj się w kuchni</h2>
          </div>
          <Link href="/przepisy" className="text-sm font-medium text-blush-deep hover:underline">
            Wszystkie przepisy →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </section>
  );
}