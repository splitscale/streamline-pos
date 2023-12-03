import { Loader2 } from "lucide-react";
import { Dialog, DialogContentNoClose } from "./ui/dialog";

export function LoadingDialog() {
  return (
    <Dialog open>
      <DialogContentNoClose className="w-fit">
        <div className="flex flex-row gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Working on it</p>
        </div>
      </DialogContentNoClose>
    </Dialog>
  );
}
