import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CreateTagForm } from "./createTagForm";

export const CreateTagDialog = () => {
  const [open, setOpen] = useState(false);

  const setDialogVisibility = (visible: boolean) => {
    setOpen(visible);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 bg-emerald-700 text-lg text-white hover:bg-emerald-600 hover:text-white">
          Create New Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Organization Tag</DialogTitle>
          <DialogDescription>
            {`Add a new tag. Click Create Tag when you're done!`}
          </DialogDescription>
        </DialogHeader>
        <CreateTagForm setDialogVisibility={setDialogVisibility} />
      </DialogContent>
    </Dialog>
  );
};
