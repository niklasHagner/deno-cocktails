import { useState } from "preact/hooks";
import {
  Cocktail,
  CocktailCard,
  Ingredient,
} from "../components/CocktailCard.tsx";
import IngredientFilterButton from "./IngredientFilterButton.tsx";

interface CocktailCollectionProps {
  cocktails: Cocktail[];
  ingredientNames: string[];
  allIngredientObjectsFromFile: Ingredient[];
}

export default function CocktailCollection(props: CocktailCollectionProps) {
  const [cocktails, setCocktails] = useState(props.cocktails);
  const [selectedIngredientNames, setSelectedIngredientNames] = useState([]);
  const allCocktails = props.cocktails;

  return (
    <>
      <h1>Pick ingredients to get cocktail suggestions</h1>
      <section class="ingredients">
        {props.allIngredientObjectsFromFile.map((ingredientObj) => (
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

              let filteredCocktails = allCocktails.
                filter((cocktail) => 
                cocktail.ingredients
                .some(x => selectedIngredientNames.includes(x.name)));
                .sort((a, b) => {
                  const aMatchingIngredientCount = a.ingredients.filter(x => selectedIngredientNames.some(x.name)).length;
                  const bMatchingIngredientCount = b.ingredients.filter(x => selectedIngredientNames.some(x.name)).length;
                  const aPercentageOfTotal = aMatchingIngredientCount / a.ingredients.length;
                  const bPercentageOfTotal = bMatchingIngredientCount / b.ingredients.length;
                  // if (aPercentageOfTotal > 0.6 || bPercentageOfTotal > 0.6) {
                  //   return a < b ? -1 : 1;
                  // }  
                  // if (aMatchingIngredientCount < bMatchingIngredientCount) {
                  //   return -1;
                  // }
                  // if (aMatchingIngredientCount > bMatchingIngredientCount) {
                  //   return 1;
                  // }
                  return aPercentageOfTotal - bPercentageOfTotal;

                  return 0;
                })
                .reverse();

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
