import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Ingredient } from "../components/CocktailCard.tsx"
interface IngredientFilterProps {
  checked: boolean;
  ingredientObj;
  // deno-lint-ignore ban-types
  onClick: Function;
}

export default function IngredientFilterButton(props: IngredientFilterProps) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <label class="ingredient-checkbox">
      <input 
        type="checkbox" 
        id={`ingredient-${props.ingredientObj.name}`}
        name={`ingredient-${props.ingredientObj.name}`}
        checked={checked}
        data-is-booze={props.ingredientObj.type === "booze" ? true : false}
        onChange={() => { setChecked(!checked); props.onClick(); }}
      />
      <span class="checkbox-label">{props.ingredientObj.name}</span>
    </label>
  );
}