import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface IngredientFilterProps {
  checked: boolean;
  name: string;
}

export default function IngredientFilter(props: IngredientFilterProps) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <span>
      <Button 
        onClick={() => { console.log("checked", checked); setChecked(!checked)} }>
        <span class="icon">{props.name} {checked === true ? "✔️" : "   "}</span>
      </Button>
    </span>
  );
}