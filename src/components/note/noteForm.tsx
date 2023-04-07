import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useProfileContext } from "../profileContext";
import { api } from "~/utils/api";

type RouterOutput = inferRouterOutputs<AppRouter>;
type noteCreateOutput = RouterOutput["note"]["create"];

const NoteForm = () => {
  const [content, setContent] = useState("");
  const { profile, isLoading, error } = useProfileContext();
  if (!profile) {
    return null;
  }

  // TODO: How can I assert that a user ID will be here since there needs to be a session?
  const userId = useSession().data?.user.id;

  const createNewNote = api.note.create.useMutation({
    onSuccess: (noteId: noteCreateOutput) => {
      setContent("");
      // TODO: refetch notes for profile -> probably best to add this to legislator context
      console.log("Successfully created note: ", noteId);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

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

export default NoteForm;
