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
  const [israreIngredientsChecked, setrareIngredientsChecked] = useState(false);
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
      const indexOfItemToPop = selectedIngredientNames.indexOf(ingredientObj.name);
      selectedIngredientNames.splice(indexOfItemToPop, 1);
    } else {
      selectedIngredientNames.push(ingredientObj.name);
    }
    setSelectedIngredientNames(selectedIngredientNames);

    let filteredCocktails = filterBySelectedIngredients();
    setCocktails(filteredCocktails);
  }

  function filterBySelectedIngredients() {
    console.log("selectedIngredientNames", selectedIngredientNames)
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
    return filteredCocktails;
  }

  function rareIngredientsToggle() {
    const new_israreIngredientsChecked = !israreIngredientsChecked;
    setrareIngredientsChecked(new_israreIngredientsChecked);
    let filteredCocktails = filterBySelectedIngredients();
    if (new_israreIngredientsChecked === true) {
      const allowedIngredients = props.allIngredientObjectsFromFile.filter(ingredient => ingredient.commonLevel < 3);
      console.log("allowedIngredients", allowedIngredients);

      const allowedIngredientNames = allowedIngredients.map(x => x.name);
      // console.log("cocktail.ingredients", filteredCocktails[0].ingredients);
      filteredCocktails = filteredCocktails.filter((cocktail) => cocktail.ingredients.every(ingredient => allowedIngredientNames.includes(ingredient.name) ));
    }
    
    console.log("filteredCocktails", filteredCocktails);
    setCocktails(filteredCocktails);
  }

  return (
    <>
      <h1>Cocktail suggestions by ingredients</h1>
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
      
      <label>
        <input type="checkbox" id="remove-rare-ingredients" name="remove-rare-ingredients" value="false" checked={israreIngredientsChecked} onChange={rareIngredientsToggle} />
        Remove rare ingredients
      </label>

      <h1>{cocktails.length} cocktails</h1>
      <section class="grid">
        {cocktails.map((cocktail) => <CocktailCard cocktail={cocktail} />)}
      </section>
    </>
  );
}
