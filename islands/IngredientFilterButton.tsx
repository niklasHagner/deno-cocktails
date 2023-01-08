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
    <span>
      <Button 
        class="ingredient-btn" style={ checked === true ? "background-color: orange;" : "" }
        onClick={() => { setChecked(!checked); props.onClick(); } }>
        <span class="icon">{props.ingredientObj.name} {checked === true ? "✔️" : "   "}</span>
      </Button>
    </span>
  );
}