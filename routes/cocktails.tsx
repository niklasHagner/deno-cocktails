import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Button } from "../components/Button.tsx";
import IngredientFilterButton from "../islands/IngredientFilterButton.tsx";
import { CocktailCard, Cocktail, Ingredient } from "../components/CocktailCard.tsx";

interface GodModel {
  cocktails: Array<Cocktail>;
  ingredientNames: Array<string>;
}

export const handler: Handlers<Cocktail | null> = {
  async GET(_, ctx) {
    const cocktailsJsonFile = await Deno.readTextFile("data/cocktails.json");
    const cocktails = await JSON.parse(cocktailsJsonFile);
    const allIngredients = cocktails.map((cocktail) => cocktail.ingredients)
      .flat();
    const allIngredientNames = allIngredients.filter((ing) =>
      ing.ingredient && !ing.special
    ).map((ing) => ing.ingredient).filter((n) => n?.length > 0);
    const ingredientNames = [...new Set(allIngredientNames)];
    const viewData = { cocktails, ingredientNames };
    return ctx.render(viewData);
  },
};

export default function Page({ data }: PageProps<GodModel | null>) {
  if (!data) {
    return <h1>Cocktails not found</h1>;
  }

  return (
    <>
      <Head>
        <title>Cocktails</title>
        <link rel="stylesheet" href="/main.css" />
        <meta name="description" content="Drink recipes" />
      </Head>
      <main>
        <h1>{data.ingredientNames.length} ingredients</h1>
        <section class="ingredients">
          {data.ingredientNames.map((ingredientName: any): Element => (
            <IngredientFilterButton name={ingredientName} checked={false} />
          ))}
        </section>

        <h1>{data.cocktails.length} cocktails</h1>
        <section class="grid">
          {data.cocktails.map((cocktail) => (
            <CocktailCard cocktail={cocktail} />
          ))}
        </section>
      </main>
    </>
  );
}
