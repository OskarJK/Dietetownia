const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export type Homepage = {
  profile: {
    name: string; tagline: string; bio: string; years_of_experience: number;
    photo: string | null; address: string; phone: string; email: string; working_hours: string;
    photoAboutMe: string | null; about_photo: string | null;
  } | null;
  services: { id: number; title: string; description: string; icon: string }[];
  stats: { id: number; number: string; label: string }[];
  assurances: { id: number; text: string }[];
  about_points: { id: number; icon: string; title: string; description: string }[];
};

export async function getHomepage(): Promise<Homepage> {
  const res = await fetch(`${API_URL}/core/homepage/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Nie udało się pobrać danych strony głównej");
  return res.json();
}

export type Category = { id: number; name: string; slug: string };

export type RecipeListItem = {
  id: number;
  title: string;
  slug: string;
  category: Category;
  description: string;
  prep_time: string;
  kcal: number;
  image: string | null;
  tags: string[];
};

export type RecipeDetail = RecipeListItem & {
  ingredients: { name: string; amount: string }[];
  steps: { order: number; content: string }[];
};

export async function getRecipes(category?: string): Promise<RecipeListItem[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const res = await fetch(`${API_URL}/recipes/${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Nie udało się pobrać przepisów");
  return res.json();
}

export async function getRecipeCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/recipe-categories/`, { cache: "no-store" });
  if (!res.ok) throw new Error("Nie udało się pobrać kategorii");
  return res.json();
}

export async function getRecipe(slug: string): Promise<RecipeDetail | null> {
  const res = await fetch(`${API_URL}/recipes/${slug}/`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Nie udało się pobrać przepisu");
  return res.json();
}