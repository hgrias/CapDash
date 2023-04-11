import { useProfileContext } from "../profileContext";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import React, { useState, ChangeEvent } from "react";
import { api } from "~/utils/api";
import Select from "react-select";

const CreateNoteForm = () => {
  const [noteContent, setNoteContent] = useState("");
  const [createInteraction, setCreateInteraction] = useState(false);
  const utils = api.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      setNoteContent("");
      // Refetch notes after a note is created
      utils.note.listForLegislator.invalidate();
      // TODO: Refetch interactions if one is created
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
    { value: "Cite and Release", label: "Cite and Release" },
    { value: "Criminal Justice", label: "Criminal Justice" },
    { value: "General", label: "General" },
  ];

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const newNote = {
  //     content,
  //     legislatorId: legislator.id,
  //     userId: userId,
  //   };
  //   createNote.mutate(newNote);
  // };

  const handleCreateInteractionCheck = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCreateInteraction(event.target.checked);
  };

  return (
    <form
      className="flex w-full flex-col sm:ml-4"
      onSubmit={handleSubmit((formData) => {
        console.log(formData);
      })}
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

      <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
        <div className="col-span-2 content-center">
          <Select
            isMulti
            name="colors"
            options={tagOptions}
            // className="w-full lg:w-1/2"
            classNamePrefix="select"
            placeholder="Select Tags"
          />
        </div>

        <div className="flex justify-center">
          <label className="flex cursor-pointer items-center">
            <span className="label-text text-base">
              Create Interaction for Note?
            </span>
            <input
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
