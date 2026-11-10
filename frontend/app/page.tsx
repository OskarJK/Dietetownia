import { getHomepage, getRecipes } from "@/lib/api";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import About from "@/components/home/About";
import Assurances from "@/components/home/Assurances";
import Services from "@/components/home/Services";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import CallToAction from "@/components/home/CallToAction";

export default async function HomePage() {
  const [data, recipes] = await Promise.all([getHomepage(), getRecipes()]);

  return (
    <>
      <Hero profile={data.profile} />
      <Stats stats={data.stats} />
      <About profile={data.profile} points={data.about_points} />
      <Assurances items={data.assurances} />
      <Services services={data.services} />
      <FeaturedRecipes recipes={recipes.slice(0, 3)} />
      <CallToAction />
    </>
  );
}