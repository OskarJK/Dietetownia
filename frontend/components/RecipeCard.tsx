import Image from "next/image";
import Link from "next/link";
import type { RecipeListItem } from "@/lib/api";

export default function RecipeCard({ recipe, large = false }: { recipe: RecipeListItem; large?: boolean }) {
  return (
    <Link
      href={`/przepisy/${recipe.slug}`}
      className="group block overflow-hidden rounded-3xl border-[1.5px] border-beige-dark bg-beige-warm shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1"
    >
      <div className={`relative overflow-hidden bg-sage-light ${large ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🥑</div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-avocado-pale px-3 py-0.5 text-xs font-medium text-avocado-dark">
            {recipe.category.name}
          </span>
          <span className="text-xs text-bark-light">· {recipe.prep_time} · {recipe.kcal} kcal</span>
        </div>

        <h3 className="mb-2 font-script text-[1.4rem] text-peat">{recipe.title}</h3>

        {large && <p className="text-[0.85rem] font-light leading-[1.7] text-bark">{recipe.description}</p>}

        {recipe.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {recipe.tags.map((t) => (
              <span key={t} className="rounded-full bg-blush-light px-2.5 py-0.5 text-[0.7rem] text-bark">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}