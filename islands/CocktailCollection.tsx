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


  function mapCocktailForSortingByPoints(cocktail: Cocktail) {
    const matchingIngredientCount = cocktail.ingredients.filter(ingredient => selectedIngredientNames.some(ingredientName => ingredientName === ingredient.name)).length;
    const percentOfIngredients = matchingIngredientCount / cocktail.ingredients.length;
    const significantIngredients = cocktail.ingredients.filter(ingredient => ingredient.unit)
    const percentOfSignificantIngredients = significantIngredients.length > 0 ? matchingIngredientCount / significantIngredients.length : 0;
    
    let bonusPoints = 0;
    if (percentOfIngredients === 1) {
      bonusPoints+= 1; 
    }
    
    const points = matchingIngredientCount + percentOfIngredients + percentOfSignificantIngredients + bonusPoints;

    console.log(cocktail.name, points, "count:", matchingIngredientCount, percentOfSignificantIngredients * 100, "%", "total:", percentOfIngredients * 100, "%", "bonusPoints", bonusPoints);

    return { cocktail, matchingIngredientCount, percentOfIngredients, percentOfSignificantIngredients, points };
  }

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

        const aStats = mapCocktailForSortingByPoints(a);
        const bStats = mapCocktailForSortingByPoints(b);

        const sortResultByPercentage = bStats.points - aStats.points;

        return sortResultByPercentage;
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
