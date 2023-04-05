import { Note as NoteModel } from "@prisma/client";
import CreateNoteFooter from "./createNoteFooter";
import Note from "./note";
import React from "react";

// The portion of data returned from the legislator getProfileData procedure relating to Notes
interface ProfileNotesData {
  Note: (NoteModel & {
    user: {
      name: string;
      image: string | null;
    };
  })[];
}

// Picking out the Note type and creating a new type for the array
type NoteType = Pick<ProfileNotesData, "Note">;
type NoteArrayType = Exclude<NoteType["Note"], undefined>;

// Using this new type as our note props
interface ProfileNotesProps {
  notes?: NoteArrayType;
}

const ProfileNotes = ({ notes }: ProfileNotesProps) => {
  return (
    <div id="profileNotes" className="w-full rounded-lg bg-white shadow-lg">
      <div id="header" className="border-b-1 border-b p-4 text-xl">
        <h1>Notes</h1>
      </div>

      {notes?.length ? (
        notes.map((note) => {
          return (
            <Note
              key={note.id}
              content={note.content}
              creatorName={note.user.name}
              creatorImage={note.user.image}
              createdAt={note.createdAt}
            />
          );
        })
      ) : (
        <h2 className="p-4 font-normal">There are no notes! Create one!</h2>
      )}

      <CreateNoteFooter />
    </div>
  );
};

export default ProfileNotes;
