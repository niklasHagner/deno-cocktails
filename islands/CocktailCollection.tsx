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

  function clickFilter(ingredientObj: Ingredient) {
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
      filter((cocktail) => cocktail.ingredients.some(ingredient => selectedIngredientNames.includes(ingredient.name)))
      .sort((a, b) => {
        const aMatchingIngredientCount = a.ingredients.filter(ingredient => selectedIngredientNames.some(ingredientName => ingredientName === ingredient.name)).length;
        const bMatchingIngredientCount = b.ingredients.filter(ingredient => selectedIngredientNames.some(ingredientName => ingredientName === ingredient.name)).length;

        const sortResult = aMatchingIngredientCount - bMatchingIngredientCount;
        return sortResult;
        

        // const aPercentageOfTotal = aMatchingIngredientCount / a.ingredients.length;
        // const bPercentageOfTotal = bMatchingIngredientCount / b.ingredients.length;
        // return aPercentageOfTotal - bPercentageOfTotal;
        // if (aPercentageOfTotal > 0.6 || bPercentageOfTotal > 0.6) {
        //   return a < b ? -1 : 1;
        // }  
        // if (aMatchingIngredientCount < bMatchingIngredientCount) {
        //   return -1;
        // }
        // if (aMatchingIngredientCount > bMatchingIngredientCount) {
        //   return 1;
        // }
        // return 1;
      });

    if (selectedIngredientNames.length <= 0) {
      filteredCocktails = allCocktails;
    }
    setCocktails(filteredCocktails);
  }

  return (
    <>
      <h1>Pick ingredients to get cocktail suggestions</h1>
      <section class="ingredients">
        {
          props.allIngredientObjectsFromFile.map(ingredientObj => (
            <IngredientFilterButton
              ingredientObj={ingredientObj}
              checked={false}
              onClick={() => {clickFilter(ingredientObj);} }
            />
          ))
        }
      </section>

      <h1>{cocktails.length} cocktails</h1>
      <section class="grid">
        {cocktails.map((cocktail) => <CocktailCard cocktail={cocktail} />)}
      </section>
    </>
  );
}
