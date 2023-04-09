import { useProfileContext } from "../profileContext";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";

const CreateNoteForm = () => {
  const [content, setContent] = useState("");

  const createNewNote = api.note.create.useMutation({
    onSuccess: () => {
      setContent("");
      refetchProfileNotes();
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const { profile, refetchProfileNotes, isLoading, error } =
    useProfileContext();

  const { data: session } = useSession();

  if (!profile || !session) {
    return null;
  }

  const userId = session.user.id;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote = {
      content,
      legislatorId: profile.id,
      userId: userId,
    };
    createNewNote.mutate(newNote);
  };

  return (
    <form className="flex w-full flex-col sm:ml-4" onSubmit={handleSubmit}>
      <textarea
        id="noteContent"
        className="textarea-bordered textarea h-28 w-full resize-y"
        style={{ resize: "vertical" }}
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a note"
      />
      <button className="btn-sm btn ml-auto mt-3 sm:btn" type="submit">
        Add Note
      </button>
    </form>
  );
};

export default CreateNoteForm;
