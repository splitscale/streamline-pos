import { Checkbox } from "@mui/material";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface BoxCardProps {
  id?: string;
  name: string;
  availableUnits: number;
  unitPrice: number;
}

export function BoxCard(props: BoxCardProps) {
  const utils = api.useUtils();
  const router = useRouter();

  const deleteItem = api.cashier.deleteSingleItem.useMutation({
    onSuccess() {
      utils.cashier.invalidate();
    },
  });

  const handleDelete = () => {
    deleteItem.mutate({
      item_id: props.id ?? "",
    });
  };

  const handleEdit = () => {
    router.push(
      `/editItem/${props.id}/${props.name}/${props.availableUnits}/${props.unitPrice}`,
    );
  };

  return (
    <div className="flex flex-row">
      <div className="flex-auto rounded-md bg-[#D9D9D9] px-3 py-2 ">
        <div className="flex flex-row place-content-between">
          <p className="text-lg font-semibold normal-case ">{props.name}</p>
          <div className="flex flex-row space-x-2">
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
            <Button variant={"default"} onClick={handleEdit}>
              Edit
            </Button>
          </div>
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
