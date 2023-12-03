import {
  faMinus,
  faPlus,
  faClipboard,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

export interface CashierCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  comment: string;
  onTrash: (id: string) => void;
  onComment: (comment: string, name: string) => void;
  onQuantitySet: (quantity: number, name: string) => void;
}

export function CashierCard(props: CashierCardProps) {
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const [comment, setComment] = useState<string>(props.comment);
  const [backupComment, setBackupComment] = useState<string>(props.comment);
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCommentOpen = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    props.onComment(comment, props.name);
    setCommentOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleQuantitySet(
    qty: number,
    options?: { operation: "increment" | "decrement" },
  ): void {
    let mutableQty = qty;

    if (options?.operation === "increment") mutableQty += 1;
    if (options?.operation === "decrement") mutableQty -= 1;

    props.onQuantitySet(mutableQty, props.name);

    setQuantity(mutableQty);
    setQuantity(mutableQty);
    if (mutableQty < 1) props.onTrash(props.name);
  }

  return (
    <>
      <div className="flex flex-col gap-2 rounded-md  bg-gray-300 p-2">
        <div className="flex flex-row place-content-between  px-2">
          {/* top */}
          <div className="flex pr-2">
            <TrashControl onTrigger={handleClickOpen} />
          </div>
          <div className="flex grow flex-col text-start">
            <p className="text-lg font-semibold normal-case text-black">
              {props.name}
            </p>
            <p className="text-black">{`P ${
              Number(props.price) * Number(quantity)
            }`}</p>
          </div>
          <div className="flex pr-5">
            <CommentControl onTrigger={handleCommentOpen} />
          </div>
        </div>

        <div className="flex flex-col gap-3 divide-y-2 divide-dashed divide-slate-500">
          <QuantityControl
            quantity={quantity}
            onIncrement={() =>
              handleQuantitySet(quantity, { operation: "increment" })
            }
            onDecrement={() =>
              handleQuantitySet(quantity, { operation: "decrement" })
            }
          />

          <div className="flex grow flex-col">
            <p className="whitespace-pre-wrap break-words text-sm normal-case">
              {comment}
            </p>
          </div>
        </div>

        {/* comment control */}

        <div className="grid max-h-[calc(100vh-20px)] grid-cols-2 overflow-y-auto text-center text-2xl text-red-500 ">
          <div>
            <Dialog
              open={commentOpen}
              onClose={handleCommentClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Add Comment"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please enter a comment for this item.
                </DialogContentText>
                <Textarea
                  autoFocus={true}
                  id="name"
                  title="Comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setComment(backupComment);
                    handleCommentClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setBackupComment(comment);
                    handleCommentClose();
                  }}
                >
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant={"secondary"} onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    handleClose();
                    props.onTrash(props.name);
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

function QuantityControl(props: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="grid h-12  grid-cols-3 place-content-center rounded-md bg-pink">
      <div className="flex place-content-center ">
        <IconButton
          aria-label="decrement"
          onClick={props.onDecrement}
          className="border-transparent bg-transparent"
        >
          <FontAwesomeIcon
            icon={faMinus}
            style={{ color: "#ffffff", width: "34px", height: "auto" }}
          />
        </IconButton>
      </div>

      <div className="flex place-content-center">
        <p className="grow self-center  text-center text-2xl font-semibold text-white">
          {props.quantity}
        </p>
      </div>

      <div className="flex place-content-center ">
        <IconButton
          aria-label="increment"
          onClick={props.onIncrement}
          className="border-transparent bg-transparent"
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ color: "#ffffff", width: "34px", height: "auto" }}
          />
        </IconButton>
      </div>
    </div>
  );
}

function CommentControl(props: { onTrigger: () => void }) {
  return (
    <IconButton
      aria-label="add comment"
      onClick={props.onTrigger}
      className="border-transparent bg-transparent"
    >
      <FontAwesomeIcon
        icon={faClipboard}
        style={{ color: "#747474", width: "auto", height: "38px" }}
      />
    </IconButton>
  );
}

function TrashControl(props: { onTrigger: () => void }) {
  return (
    <IconButton
      aria-label="delete"
      onClick={props.onTrigger}
      className="border-transparent bg-transparent"
    >
      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "#FF0000", width: "auto", height: "20px" }}
      />
    </IconButton>
  );
}