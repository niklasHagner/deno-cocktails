export interface Cocktail {
  name: string;
  glass: string;
  category: string;
  ingredients: Array<Ingredient>;
  garnish: string;
  preparation: string;
  imgUrl: string;
  description: string;
}
export interface Ingredient {
  name: string;
  unit?: string;
  amount?: number;
  special?: string;
}

export function CocktailCard(props: { cocktail: Cocktail}) {
  return (
    <article class="mui-card">
      <div class="mui-button" type="button">
        {props.cocktail.imgUrl && (
          <img src={props.cocktail.imgUrl} alt="" />
        )}
        <div class="mui-card__text-wrap">
          <h2>{props.cocktail.name}</h2>
          <div class="mui-card__desc">
            <ul>
              {props.cocktail.ingredients.map((ingredient: Ingredient) => (
                <li class="ingredient">
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                  {ingredient.special && ingredient.special}
                </li>
              ))}
            </ul>
            {props.cocktail.description && (
              <p>
                <span class="label">Description:</span>{" "}
                {props.cocktail.description}
              </p>
            )}
            {props.cocktail.garnish && (
              <p>
                <span class="label">Garnish:</span> {props.cocktail.garnish}
              </p>
            )}
            <p>{props.cocktail.preparation}</p>
            {props.cocktail.glass && (
              <p>
                <span class="label">Glass:</span> {props.cocktail.glass}
              </p>
            )}
            {props.cocktail.category && (
              <p>
                <span class="label">Category:</span> {props.cocktail.category}
              </p>
            )}
          </div>
        </div>
      </div>
      <div class="mui-card__buttons">
        <button type="button">
          <span class="button__touchripple"></span>
        </button>
      </div>
    </article>
  );
}