import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tag name must be at least 2 characters.",
  }),
});

export const CreateTagForm = ({
  setDialogVisibility,
}: {
  setDialogVisibility: (visible: boolean) => void;
}) => {
  const utils = api.useContext();
  const { toast } = useToast();

  const handleDialogVisibilityChange = (visible: boolean) => {
    setDialogVisibility(visible);
  };

  const { mutate: createTagMutation } = api.tag.create.useMutation({
    onSuccess: () => {
      // Refetch the tags
      void utils.organization.tags.invalidate();
      // Close the dialog
      handleDialogVisibilityChange(false);
      // Confirmation notification
      toast({
        title: "Tag Created!",
        description: "Tag has been added to organization tags",
        action: <Check color="green" size={36} />,
        className: "border-2 border-green-600",
        duration: 3000,
      });
    },
    onError: (error) => {
      if (
        error.shape?.message ===
        "ERROR: Unique constraint violation for create tag"
      ) {
        form.setError("name", {
          message: "Tag already exists.",
          type: "string",
        });
      } else {
        console.error(error);
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTagMutation(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-end justify-end">
          <Button
            className="w-36 bg-emerald-700 text-white hover:bg-emerald-600 hover:text-white"
            type="submit"
          >
            Create Tag
          </Button>
        </div>
      </form>
    </Form>
  );
};
