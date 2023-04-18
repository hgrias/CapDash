import { useProfileContext } from "../profileContext";
import { useSession } from "next-auth/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React, { useState, ChangeEvent } from "react";
import { api } from "~/utils/api";
import Select from "react-select";
import { InteractionMethod } from "@prisma/client";
import { useOrganizationContext } from "../organizationContext";

// This models the multi-select options
interface TagOptions {
  value: number;
  label: string;
}

type FormValues = {
  noteContent: string;
  createInteraction: boolean;
  interactionMethod: string;
  interactionContent?: string;
  tags?: TagOptions[]; // Array of tag ID to label objects
};

const CreateNoteForm = () => {
  const [interactionContent, setInteractionContent] = useState<string>("");
  const [createInteraction, setCreateInteraction] = useState<boolean>(false);
  const [tagIds, setTagIds] = useState<{ id: number }[] | undefined>();
  const { legislator, selectedSession, error } = useProfileContext();
  const [noteContent, setNoteContent] = useState<string>("");
  const [interactionMethod, setInteractionMethod] =
    useState<InteractionMethod>("email");
  const { orgTags } = useOrganizationContext();
  const { data: session } = useSession();
  const utils = api.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>();

  const createInteractionMutation = api.interaction.create.useMutation({
    onSuccess: (newInteractionId) => {
      // Refetch interactions after one is created
      utils.interaction.getForLegislator.invalidate();
      // Reset the multi-select for tags
      reset({ tags: [] });
      // Also reset the tag IDs state
      setTagIds(undefined);
    },
    onError: (error) => {
      console.error("Error creating interaction from note: ", error);
    },
  });

  // TODO: Figure out if there is a better way to handle !. invocations
  const createNote = api.note.create.useMutation({
    onSuccess: (newNoteId) => {
      setNoteContent("");
      // Refetch notes after a note is created
      utils.note.listForLegislator.invalidate();
      // Create a new interaction as well if specified
      if (createInteraction) {
        setCreateInteraction(false);
        // Create the new interaction as well as connect to note
        createInteractionMutation.mutate({
          content: interactionContent,
          legislatorId: legislator!.id,
          method: interactionMethod,
          sessionId: selectedSession!.id,
          noteId: newNoteId,
          tags: tagIds,
        });
      } else {
        // Reset the multi-select for tags
        reset({ tags: [] });
        // Also reset the tag IDs state
        setTagIds(undefined);
      }
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  if (!legislator || !session) {
    return null;
  }

  const tagOptions = orgTags?.map((tag) => {
    return { value: tag.id, label: tag.name };
  });

  const interactionMethods = Object.values(InteractionMethod).map((method) => {
    return method;
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (createInteraction) {
      // If there are tags, get them into format so we can connect them to notes
      let tagIds: { id: number }[] | undefined = undefined;
      if (data.tags) {
        tagIds = data.tags.map((tagObject) => {
          return { id: tagObject.value };
        });
        setTagIds(tagIds);
      }
      // Set the interaction method state
      setInteractionMethod(
        data.interactionMethod.toLowerCase() as InteractionMethod
      );
    }

    const newNote = {
      content: noteContent,
      legislatorId: legislator.id,
      tagIds: tagIds,
    };

    createNote.mutate(newNote);
  };

  const handleCreateInteractionCheck = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCreateInteraction(event.target.checked);
  };

  return (
    <form
      className="flex w-full flex-col sm:ml-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        {...register("noteContent", { required: true })}
        id="noteContent"
        className="textarea-bordered textarea h-28 w-full resize-y"
        style={{ resize: "vertical" }}
        required
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Add a note"
      />

      {createInteraction && (
        <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
          <select
            {...register("interactionMethod", { required: true })}
            className="select-bordered select w-full max-w-xs font-normal"
            required
          >
            <option disabled>Select Interaction Method</option>
            {interactionMethods.map((method) => {
              return <option key={method}>{method}</option>;
            })}
          </select>

          <textarea
            {...register("interactionContent")}
            id="interactionContent"
            className="textarea-bordered textarea h-12 w-full resize-y"
            style={{ resize: "vertical" }}
            value={interactionContent}
            onChange={(e) => setInteractionContent(e.target.value)}
            placeholder="Brief interaction summary (optional)"
          />
        </div>
      )}

      <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
        <div className="col-span-2 content-center">
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                isMulti
                name={name}
                options={tagOptions}
                classNamePrefix="select"
                placeholder="Select Tags"
                onBlur={onBlur}
                onChange={(selected) => {
                  onChange(selected);
                }}
                value={value}
                ref={ref}
              />
            )}
          />
        </div>

        <div className="flex ">
          <label className="flex cursor-pointer items-center">
            <span className="label-text text-base">
              Create Interaction for Note?
            </span>
            <input
              {...register("createInteraction")}
              type="checkbox"
              className="checkbox ml-3"
              checked={createInteraction}
              onChange={handleCreateInteractionCheck}
            />
          </label>
        </div>

        <button className="btn-sm btn ml-auto sm:btn" type="submit">
          Add Note
        </button>
      </div>
    </form>
  );
};

export default CreateNoteForm;
