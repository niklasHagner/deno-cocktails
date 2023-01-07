import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Cocktail, Ingredient } from "../components/CocktailCard.tsx";
import CocktailCollection from "../islands/CocktailCollection.tsx";

interface GodModel {
  cocktails: Array<Cocktail>;
  ingredientNames: Array<string>;
  allIngredientObjectsFromFile: Array<Ingredient>;
}

export const handler: Handlers<Cocktail | null> = {
  async GET(_, ctx) {
    const cocktailsJsonFile = await Deno.readTextFile("data/cocktails.json");
    const cocktails = await JSON.parse(cocktailsJsonFile);
    const allIngredients = cocktails.map((cocktail) => cocktail.ingredients)
      .flat();

    const ingredientsJsonFile = await Deno.readTextFile("data/ingredients.json");
    const allIngredientObjectsFromFile = await JSON.parse(ingredientsJsonFile)
      .filter(ingredient => ingredient.isRelevant)

    const initialIngredientNamesToFilterBy = [];
    const viewData = { cocktails, initialIngredientNamesToFilterBy, allIngredientObjectsFromFile };
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
        <CocktailCollection cocktails={data.cocktails} ingredientNames={data.ingredientNames} allIngredientObjectsFromFile={data.allIngredientObjectsFromFile} />
      </main>
      <footer>
        <p>Made by Hagge</p>
      </footer>
    </>
  );
}
