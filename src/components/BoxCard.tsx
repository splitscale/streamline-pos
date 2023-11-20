import { Checkbox } from "@mui/material";
import { Button } from "./ui/button";

interface BoxCardProps {
  id?: string;
  name: string;
  availableUnits: number;
  unitPrice: number;
}

export function BoxCard(props: BoxCardProps) {
  return (
    <div className="flex flex-row">
      <div className="grow-0 place-self-center">
        <Checkbox onClick={() => console.log("Selected: " + props.id)} />
      </div>
      <div className="flex-auto rounded-md bg-[#D9D9D9] px-3 py-2 ">
        <div className="flex flex-row place-content-between">
          <p className="text-lg font-semibold normal-case ">{props.name}</p>
          <Button
            variant={"link"}
            onClick={() => console.log("Pressed: " + props.id)}
          >
            Edit
          </Button>
        </div>
        <p className="text-md truncate text-start font-semibold ">{`${
          props.unitPrice ?? 0
        } php`}</p>
        <p className="truncate text-sm">{`${props.availableUnits ?? 0} ${
          props.availableUnits <= 1 ? "unit" : "units"
        } left`}</p>
      </div>
    </div>
  );
}
