import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";

export const CreateTagDialog = () => {
  // const createNewOrgTag = api.tag.create.useMutation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 bg-emerald-700 text-lg text-white hover:bg-emerald-600 hover:text-white">
          Create New Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A New Organization Tag</DialogTitle>
          <DialogDescription>
            {`Add a new tag. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tagName" className="text-right">
              Tag Name
            </Label>
            <Input id="tagName" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="icon" className="text-right">
              Icon
            </Label>
            <Input id="icon" defaultValue="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
            type="submit"
          >
            Create Tag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
