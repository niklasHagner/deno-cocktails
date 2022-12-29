import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface IngredientFilterProps {
  checked: boolean;
  ingredientObj;
  onClick: Function;
}

export default function IngredientFilterButton(props: IngredientFilterProps) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <span>
      <Button 
        class="ingredient-btn" style={ props.ingredientObj.abv > 0 ? "background-color: orange;" : "" }
        onClick={() => { setChecked(!checked); props.onClick(); } }>
        <span class="icon">{props.ingredientObj.name} {checked === true ? "✔️" : "   "}</span>
      </Button>
    </span>
  );
}