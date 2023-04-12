import { useProfileContext } from "../profileContext";
import { useSession } from "next-auth/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React, { useState, ChangeEvent } from "react";
import { api } from "~/utils/api";
import Select from "react-select";

const CreateNoteForm = () => {
  const [noteContent, setNoteContent] = useState<string>("");
  const [interactionContent, setInteractionContent] = useState<string>("");
  const [createInteraction, setCreateInteraction] = useState<boolean>(false);
  const utils = api.useContext();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>();

  const createNote = api.note.create.useMutation({
    onSuccess: (newNoteId) => {
      setNoteContent("");
      // Refetch notes after a note is created
      utils.note.listForLegislator.invalidate();
      if (createInteraction) {
        setCreateInteraction(false);
        // TODO: Create the new interaction as well and connect to note
        // TODO: Invalidate interactions query to refetch them
      }
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const { legislator, error } = useProfileContext();
  const { data: session } = useSession();

  if (!legislator || !session) {
    return null;
  }

  const userId = session.user.id;

  // TODO: Get these values from org/user context (need to create that)
  const tagOptions = [
    { value: 1, label: "Cite and Release" },
    { value: 2, label: "Criminal Justice" },
    { value: 3, label: "General" },
  ];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);

    // If there are tags, get them into format so we can connect them to notes
    let tagIds = undefined;
    if (data.tags) {
      tagIds = data.tags.map((tagObject) => {
        return { id: tagObject.value };
      });
    }

    const newNote = {
      content: noteContent,
      legislatorId: legislator.id,
      userId: userId,
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
            {/* TODO: Dynamically get these values from enum */}
            <option disabled>Select Interaction Method</option>
            <option>Email</option>
            <option>Meeting</option>
            <option>Testify</option>
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
            render={({ field: { onChange, onBlur, value, name } }) => (
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
