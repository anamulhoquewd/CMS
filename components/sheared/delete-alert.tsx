import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

function DeleteAlert({
  isOpen,
  setIsOpen,
  setId,
  cb,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setId: (userId: string) => void;
  cb: () => void;
}) {
  const [prompt, setPrompt] = useState(""); // Local state to track the input value

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setId("");
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <br />
        <Label htmlFor="delete" className="font-semibold text-muted-foreground">
          Please type “DELETE” below
        </Label>
        <Input
          id="delete"
          autoFocus
          onChange={(e) => setPrompt(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={prompt !== "DELETE"}
            onClick={() => {
              if (prompt === "DELETE") {
                cb();
              }
            }}
            className={`${
              prompt === "DELETE" &&
              "cursor-pointer text-white hover:text-white bg-destructive/90 hover:bg-destructive"
            }`}
          >
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlert;
