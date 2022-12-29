import { useState } from "preact/hooks";
import {
  Cocktail,
  CocktailCard,
  Ingredient,
} from "../components/CocktailCard.tsx";
import IngredientFilterButton from "./IngredientFilterButton.tsx";

interface CocktailCollectionProps {
  cocktails: Array<Cocktail>;
  ingredientNames: Array<string>;
  allIngredientObjectsFromFile: Array<Ingredient>;
}

export default function CocktailCollection(props: CocktailCollectionProps) {
  const [cocktails, setCocktails] = useState(props.cocktails);
  const [selectedIngredientNames, setSelectedIngredientNames] = useState([]);
  const allCocktails = props.cocktails;

  return (
    <>
      <h1>Pick ingredients to get cocktail suggestions</h1>
      <section class="ingredients">
        {props.allIngredientObjectsFromFile.map((ingredientObj: any): Element => (
          <IngredientFilterButton
            ingredientObj={ingredientObj}
            checked={false}
            onClick={() => {
              if (selectedIngredientNames.includes(ingredientObj.name)) {
                const indexOfItemToPop = selectedIngredientNames.indexOf(
                  ingredientObj.name,
                );
                selectedIngredientNames.splice(indexOfItemToPop, 1);
              } else {
                selectedIngredientNames.push(ingredientObj.name);
              }
              setSelectedIngredientNames(selectedIngredientNames);

              let filteredCocktails = allCocktails.filter((cocktail) =>
                cocktail.ingredients.some((x) =>
                  selectedIngredientNames.includes(x.name)
                )
              );
              filteredCocktails.sort((a, b) => {
                const aCount = a.ingredients.filter((x) =>
                  x.name === ingredientObj.name
                ).length;
                const bCount = b.ingredients.filter((x) =>
                  x.name === ingredientObj.name
                ).length;
                const aPercentageOfTotal = aCount / a.ingredients.length;
                const bPercentageOfTotal = bCount / b.ingredients.length;
                if (aPercentageOfTotal > 0.6 || bPercentageOfTotal > 0.6) {
                  return a < b ? -1 : 1;
                }
                if (aCount < bCount) {
                  return -1;
                }
                if (aCount > bCount) {
                  return 1;
                }

                return 0;
              }).reverse();

              if (selectedIngredientNames.length <= 0) {
                filteredCocktails = allCocktails;
              }
              setCocktails(filteredCocktails);
              // console.log("onClick IngredientFilterButton in CocktailCollection");
            }}
          />
        ))}
      </section>

      <h1>{cocktails.length} cocktails</h1>
      <section class="grid">
        {cocktails.map((cocktail) => <CocktailCard cocktail={cocktail} />)}
      </section>
    </>
  );
}
