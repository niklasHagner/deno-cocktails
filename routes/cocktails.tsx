import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Button } from "../components/Button.tsx";
import IngredientFilterButton from "../islands/IngredientFilterButton.tsx";

interface CocktailCollection {
  cocktails: Array<Cocktail>;
}

interface Cocktail {
  name: string;
  glass: string;
  category: string;
  ingredients: Array<Ingredient>;
  granish: string;
  preparation: string;
  imgUrl: string;
}

interface Ingredient {
  unit: string;
  amount: number;
  ingredient: string;
  special: string;
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

export default function Page({ data }: PageProps<CocktailCollection | null>) {
  if (!data) {
    return <h1>Cocktails not found</h1>;
  }

  return (
    <>
      <Head>
        <title>Cocktailsss</title>
        <link rel="stylesheet" href="/main.css" />
        <meta name="description" content="Drink recipes" />
      </Head>
      <main>
        <h1>{data.ingredientNames.length} ingredients</h1>
        <section class="ingredients">
          {data.ingredientNames.map((ingredientName: any): Element => (
            // <button>
            //   {ingredientName && <span>{ingredientName}</span> }
            // </button>
            <IngredientFilterButton name={ingredientName} checked={false} />
          ))}
        </section>

        <h1>{data.cocktails.length} cocktails</h1>
        <section class="grid">
          {data.cocktails.map((cocktail) => (
            <article class="mui-card">
              <button class="mui-button" type="button">
                {cocktail.imgUrl && (
                  <img src={cocktail.imgUrl} alt="" height="140" />
                )}
                <div class="mui-card__text-wrap">
                  <h2>{cocktail.name}</h2>
                  <div class="mui-card__desc">
                    <ul>
                      {cocktail.ingredients.map((ingredient) => (
                        <li class="ingredient">
                          {ingredient.amount} {ingredient.unit}{" "}
                          {ingredient.ingredient}
                          {ingredient.special && ingredient.special}
                        </li>
                      ))}
                    </ul>
                    <p class="glass">
                      <span class="label">Glass:</span> {cocktail.glass}
                    </p>
                    {cocktail.description && (
                      <p>
                        <span class="label">Description:</span>{" "}
                        {cocktail.description}
                      </p>
                    )}
                    {cocktail.garnish && (
                      <p>
                        <span class="label">Garnish:</span> {cocktail.garnish}
                      </p>
                    )}
                    <p>{cocktail.preparation}</p>
                  </div>
                </div>
              </button>
              <div class="mui-card__buttons">
                <button type="button">
                  <span class="button__touchripple"></span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
