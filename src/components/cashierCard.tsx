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
  onComment: (comment: string, id: string) => void;
  onIncrement: (quantity: number, id: string) => void;
  onDecrement: (quantity: number, id: string) => void;
}

export function CashierCard(props: CashierCardProps) {
  const [comment, setComment] = useState<string>(props.comment);
  const [backupComment, setBackupComment] = useState<string>(props.comment);
  const [commentOpen, setCommentOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCommentOpen = () => {
    setCommentOpen(true);
  };

  const handleCommentClose = () => {
    props.onComment(comment, props.id);
    setCommentOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              Number(props.price) * Number(props.quantity)
            }`}</p>
          </div>
          <div className="flex pr-5">
            <CommentControl onTrigger={handleCommentOpen} />
          </div>
        </div>

        <div className="flex flex-col gap-3 divide-y-2 divide-dashed divide-slate-500">
          <QuantityControl
            quantity={props.quantity}
            onIncrement={() => props.onIncrement(props.quantity + 1, props.id)}
            onDecrement={() => props.onDecrement(props.quantity - 1, props.id)}
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
                    props.onTrash(props.id);
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
    <div className="grid h-12 grid-cols-3 place-content-center rounded-md bg-pink">
      <div className="flex-shrink-1 flex place-content-center">
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

      <div className="flex-shrink-1 flex place-content-center">
        <p className="grow self-center text-center text-2xl font-semibold text-white">
          {props.quantity}
        </p>
      </div>

      <div className="flex-shrink-1 flex place-content-center">
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
